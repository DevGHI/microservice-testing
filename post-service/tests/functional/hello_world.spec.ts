import { prisma } from "@ioc:Adonis/Addons/Prisma";
import { test } from "@japa/runner";

test("get /posts", async ({ client }) => {
  const response = await client.get("/posts");

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("get /posts/:id", async ({ client }) => {
  const post = await prisma.post.findFirst();
  const response = await client.get("/posts/" + post?.id);

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit /posts/create", async ({ client }) => {
  const response = await client.post("/posts/create").json({
    title: "hello",
    description: "fksjfksdfdfdffjkdjfd",
    user: {
      id: 1,
      name: "YYK",
      email: "koko@gmail.com",
    },
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit /posts/comments/:post-id", async ({ client }) => {
  const post = await prisma.post.findFirst();
  const response = await client.post("posts/comments/" + post?.id).json({
    comment: "hello",
    user: {
      id: 1,
      name: "koko",
      email: "koko@gmail.com",
    },
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});
