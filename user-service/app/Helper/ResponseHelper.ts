
class ResponseHelper {
  static success({ response, data, message,meta }: any) {
    return response.send({
      status: "success",
      message: message,
      code: 200,
      data: data,
      meta: meta
    });
  }

  static error({ response, message, code ,error}: any) {
    return response.status(code).send({
      status: "error",
      message: message,
      code: code,
      error: error,
    });
  }

}

export default ResponseHelper;
