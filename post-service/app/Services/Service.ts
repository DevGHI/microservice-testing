import PostService from "./PostServices";

export default class Service {
  private service: PostService;
  constructor() {
    this.service = new PostService();
  }

  public async subscribeEvent(payload){
    payload = JSON.parse(payload);
    const {event, data} = payload;
    switch(event){
      case 'user_deleted':
        await this.service.deletePostByUser(data.id);
      default:
        break;
    }
  }
}
