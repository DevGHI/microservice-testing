import { test } from "@japa/runner";
import User from "App/Models/User";

test("get /users", async ({ client }) => {
  const response = await client.get("/users");

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("get /users/profile/:user-id", async ({ client }) => {
  const response = await client.get("/users/profile/1");

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit login /users/login", async ({ client }) => {
  const response = await client.post("users/login").json({
    email: "user1@demo.com",
    password: "testadmin",
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit register /users/register", async ({ client }) => {
  const response = await client.post("users/register").json({
    name: "new user from testcase",
    email: "testcase@demo.com",
    password: "testadmin",
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit friend request users/add-friend", async ({ client }) => {
  const response = await client.post("users/add-friend").json({
    sender_user_id: 1,
    receiver_user_id: 3,
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("submit accept-friend users/accept-friend", async ({ client }) => {
  const response = await client.post("users/accept-friend").json({
    relation_id: 1,
  });

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("get /users/friend-lists", async ({ client }) => {
  const user = await User.first();
  const response = await client.get("users/friend-lists?user_id=" + user?.id);

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});

test("delete user  /users/:id", async ({ client }) => {
  const user = await User.query().where("email", "testcase@demo.com").first();
  const response = await client.delete("users/" + user?.id);

  response.assertStatus(200);
  response.assertBodyContains({ status: "success" });
});
