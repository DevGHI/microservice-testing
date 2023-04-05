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

  public async saveComment({ request, response }) {
    const post_id = request.param("post_id");
    const comment = request.input("comment");
    const user = request.input("user");

    const data = await prisma.comment.create({
      data: {
        comment: comment,
        post_id: post_id,
        user: user,
      },
    });

    return ResponseHelper.success({
      response,
      data,
      message: "Comment added successfully.",
      code: 200,
    });
  }

  public async deletePostByUser(user_id) {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          is: {
            id: parseInt(user_id),
          },
        },
      },
    });

    posts.forEach(async (post) => {
      await prisma.comment.deleteMany({
        where: {
          post_id: post.id,
        },
      });

      await prisma.post.delete({
        where: {
          id: post.id,
        },
      });
    });
  }

 
}
