import { prisma } from "@ioc:Adonis/Addons/Prisma";
import ResponseHelper from "App/Helper/ResponseHelper";

export default class PostService {
  public async createPost({ request, response }) {
    try {
      await prisma.post.create({
        data: {
          title: request.input("title"),
          description: request.input("description"),
          user: request.input("user"),
        },
      });

      return ResponseHelper.success({
        response,
        message: "Created success.",
        code: 201,
      });
    } catch (error) {
      return ResponseHelper.error({
        response,
        message: "Created failed.",
        code: 400,
        error: error,
      });
    }
  }
}
