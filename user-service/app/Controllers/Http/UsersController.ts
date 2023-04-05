// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import ResponseHelper from "App/Helper/ResponseHelper";
import UserService from "App/Services/UserService";
import MessageB from "@ioc:MessageBroker";
import MessageBroker from "App/Services/MessgeBroker";
export default class UsersController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async login({ auth, request, response }) {
    //validation
    try {
      await request.validate({
        schema: schema.create({
          email: schema.string(),
          password: schema.string(),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }

    return this.service.login({ auth, request, response });
  }

  public async register({ request, response }) {
    // validation
    try {
      await request.validate({
        schema: schema.create({
          name: schema.string(),
          email: schema.string(),
          password: schema.string(),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }

    return this.service.register({ request, response });
  }

  public async addFriend({ request, response }) {
    // validation
    try {
      await request.validate({
        schema: schema.create({
          sender_user_id: schema.number(),
          receiver_user_id: schema.number(),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }

    return this.service.addFriend({ request, response });
  }

  public async acceptFriend({ request, response }) {
    // validation
    try {
      await request.validate({
        schema: schema.create({
          relation_id: schema.string(),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }

    return this.service.acceptFriend({ request, response });
  }

  public async friendLists({ request, response }) {
    // validation
    try {
      await request.validate({
        schema: schema.create({
          user_id: schema.number(),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }
    return this.service.friendLists({ request, response });
  }

  public async profile({ request, response }) {
    const id = request.param("id");
    const user = await User.find(id);

    // const channel = await MessageB.createChannel();
    // await MessageB.publishMessage({
    //   channel: channel,
    //   binding_key: "user-service",
    //   message: JSON.stringify(user),
    // });

     const channel = await MessageB;

      const broker = new MessageBroker();
      await broker.publishMessage({
        channel: channel,
        binding_key: "post-key",  //other service key
        message: JSON.stringify(user),
      });

    return user;
  }
}
