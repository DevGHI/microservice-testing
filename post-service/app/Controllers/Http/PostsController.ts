import { schema } from "@ioc:Adonis/Core/Validator";
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import ResponseHelper from "App/Helper/ResponseHelper";
import PostService from "App/Services/PostServices";
import MessageB from "@ioc:MessageBroker";
import MessageBroker from "App/Services/MessgeBroker";
export default class PostsController {
  private service: PostService;
  constructor() {
    this.service = new PostService();
  }
  public async store({ request, response }) {
    try {
      await request.validate({
        schema: schema.create({
          title: schema.string(),
          description: schema.string(),
          user: schema.object().members({
            id: schema.number(),
            name: schema.string(),
            email: schema.string(),
          }),
        }),
      });
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: "Validation failed",
        errors: error.messages,
      });
    }
    return this.service.createPost({ request, response });
  }

  public async index({ response }) {
    const posts = await prisma.post.findMany({});

    return ResponseHelper.success({
      response,
      message: "Get all posts success.",
      code: 200,
      data: posts,
    });
  }

  public async show({ params, response }) {
    try {
      const user_id = params.user_id;
      console.log(user_id);
      const posts = await prisma.post.findMany({
        where: {
          user: {
            is: {
              id: parseInt(user_id),
            },
          },
        },
      });

      return ResponseHelper.success({
        response,
        message: "Get all posts success.",
        code: 200,
        data: posts,
      });
    } catch (error) {
      return ResponseHelper.error({
        response,
        message: error.message,
        code: 400,
        data: null,
      });
    }
  }

  public async send() {
    const channel = await MessageB
    const broker = new MessageBroker();
    await broker.publishMessage({
      channel: channel,
      binding_key: "user-service",
      message: "Hello from post-service",
    });
    console.log("Message sent");
  }
}
