import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MessageBroker from 'App/Services/MessgeBroker';
export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
    // this.app.container.singleton('MessageBroker', () => {
    //   console.log('start create channel')
    //   const broker = new MessageBroker();
    //   const channel=broker.createChannel();
    //   return {
    //     channel,
    //     broker
    //   };
    // });
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
    // this.app.container.use('MessageBroker')
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
