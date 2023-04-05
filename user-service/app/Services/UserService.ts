import ResponseHelper from "App/Helper/ResponseHelper";
import Friend from "App/Models/Friend";
import User from "App/Models/User";


export default class UserService{
  public async login({ auth, request, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password);
      return ResponseHelper.success({
        response,
        data: token.toJSON(),
        message: "Login success",
      });
    } catch {
      return ResponseHelper.error({
        response,
        message: "Invalid email or password",
        code: 400,
        error: [],
      });
    }
  }

  public async register({ request, response }) {
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");

    try {
      const user = await User.query().where("email", email).first();
      if (user) {
        return response.status(400).send({
          status: "error",
          message: "Email already exists",
          errors: [],
        });
      }
      let res = await User.create({
        name,
        email,
        password,
      });
      return ResponseHelper.success({
        response,
        data: res,
        message: "Register success",
      });
    } catch (error) {
      return ResponseHelper.error({
        response,
        message: "Register failed",
        code: 400,
        error: error,
      });
    }
  }

  public async addFriend({ request, response }) {
    const sender_user_id = request.input("sender_user_id");
    const receiver_user_id = request.input("receiver_user_id");

    try {
      let res = await Friend.create({
        sender_user_id,
        receiver_user_id,
      });
      return ResponseHelper.success({
        response,
        data: res,
        message: "Add friend success",
      });
    } catch (error) {
      return ResponseHelper.error({
        response,
        message: "Add friend failed",
        code: 400,
        error: error,
      });
    }
  }

  public async acceptFriend({ request, response }) {
    const friend_id = request.input("friend_id");

    try {
      let res = await Friend.query().where("id", friend_id).update({
        status: "accepted",
      });
      return ResponseHelper.success({
        response,
        data: res,
        message: "Accept friend success",
      });
    }
    catch (error) {
      return ResponseHelper.error({
        response,
        message: "Accept friend failed",
        code: 400,
        error: error,
      });
    }
  }

}


