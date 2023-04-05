import { PostService } from 'App/Services/PostServices';
import  MessageBroker from 'App/Services/MessgeBroker';
import  MessageB  from '@ioc:MessageBroker';
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Rabbit from '@ioc:Adonis/Addons/Rabbit'
import Service from 'App/Services/Service';

async function listen() {
  console.log('start listen')
  const service = new Service();
  const channel = await MessageB
    const broker = new MessageBroker();
    await broker.subscribeMessage({
      channel: channel,
      service: service
    });
  // await Rabbit.assertQueue('my_queue')

  // await Rabbit.consumeFrom('my_queue', (message) => {
  //   console.log(message.content)
  // })
}

listen()
