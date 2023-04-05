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
      return ResponseHelper.error({
        response,
        message: "Validation failed",
        code: 400,
        error: error.messages,
      });
    }
    return this.service.createPost({ request, response });
  }

  public async index({ request,response }) {
    const user_id = request.input("user_id");
    let prisma_obj = {};
    if (user_id) {
      prisma_obj = {
        where: {
          user: {
            is: {
              id: parseInt(user_id),
            },
          },
        },
      };
    }


    const posts = await prisma.post.findMany(prisma_obj);

    return ResponseHelper.success({
      response,
      message: "Get all posts success.",
      code: 200,
      data: posts,
    });
  }

  public async submitComment({ request, response }) {
    try {
      await request.validate({
        schema: schema.create({
          comment: schema.string(),
          user: schema.object().members({
            id: schema.number(),
            name: schema.string(),
            email: schema.string(),
          }),
        }),
      });
    } catch (error) {
      return ResponseHelper.error({
        response,
        message: "Validation failed",
        code: 400,
        error: error.messages,
      });
    }

    return this.service.saveComment({ request, response });

  }

  public async show({ request, response }) {
    const post_id = request.param("id");
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      include: {
        comments: true,
      },
    });

    return ResponseHelper.success({
      response,
      message: "Get post success.",
      code: 200,
      data: post,
    });
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
