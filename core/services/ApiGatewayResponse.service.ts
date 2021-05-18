export class ApiGatewayResponse {
  statusCode: number;
  body: string;
  constructor(statusCode, body) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
export class ApiGatewayResponseService {
  static BadRequest(message): ApiGatewayResponse {
    return new ApiGatewayResponse(400, JSON.stringify({ message: message }));
  }

  static NotFound(message): ApiGatewayResponse {
    return new ApiGatewayResponse(404, JSON.stringify({ message: message }));
  }

  static Success(data): ApiGatewayResponse {
    return new ApiGatewayResponse(200, JSON.stringify(data));
  }

  static Error(message): ApiGatewayResponse {
    return new ApiGatewayResponse(500, JSON.stringify({ message: message }));
  }

  static Unauthorized(message): ApiGatewayResponse {
    return new ApiGatewayResponse(401, JSON.stringify({ message: message }));
  }
}
