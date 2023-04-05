const amqplib = require("amqplib");

export default class MessageBroker {
  public async createChannel() {
    try {
      const connection = await amqplib.connect(process.env.MESSAGE_BROKER_URL);
      const channel = await connection.createChannel();
      await channel.assertExchange(
        process.env.MESSAGE_BROKER_EXCHANGE_NAME,
        "direct",
        false
      );
      return channel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async start({service}){
    const channel=await this.createChannel();
    this.subscribeMessage({channel,service})
  }

  public async publishMessage({ channel, binding_key, message }) {
    try {
      await channel.publish(
        process.env.MESSAGE_BROKER_EXCHANGE_NAME,
        binding_key,
        Buffer.from(message)
      );
      console.log('message has been sent')
    } catch (err) {
      throw err;
    }
  }

  public async subscribeMessage({ channel, service }) {
    const appQueue = await channel.assertQueue(process.env.QUEUE_NAME);
    console.log("subscribeMessage");
    await channel.bindQueue(
      appQueue.queue,
      process.env.MESSAGE_BROKER_EXCHANGE_NAME,
      process.env.BINDING_KEY
    );

    channel.consume(appQueue.queue, (data) => {
      console.log("receive data");
      console.log(data.content.toString());
      channel.ack(data);
    });
  }
}
