import { prisma, PrismaSeederBase } from "@ioc:Adonis/Addons/Prisma";

export default class PostSeeder extends PrismaSeederBase {
  public static developmentOnly = false;

  public async run() {
    //  create region
    let regions = [
      {
        title: "post1",
        description: " Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch",
        user: {
          id: 1,
          name: "user1",
          email: "user1@demo.com",
        },
      },
      {
        title: "post2",
        description: " Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch",
        user: {
          id: 1,
          name: "user2",
          email: "user2@demo.com",
        },
      },
      {
        title: "post3",
        description: " Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch",
        user: {
          id: 1,
          name: "user1",
          email: "user1demo@gmail.com",
        },
      },
    ];

    await prisma.post.createMany({
      data: regions,
    });
  }
}
