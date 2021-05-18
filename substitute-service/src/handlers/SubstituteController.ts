import { APIGatewayProxyHandler } from "aws-lambda";
import {ReplaceWordService} from "@services/ReplaceWordService";
import { ApiGatewayResponseService } from 'substitution-api-core/services/ApiGatewayResponse.service';
import { SentenceRequest } from "@root/models/sentence.request.model";

export const ReplaceWord: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const replaceWordService = new ReplaceWordService();
    let body = JSON.parse(event.body) as SentenceRequest;
    let serviceRes = await replaceWordService.ReplaceWord(body.sentence);
    if (serviceRes.isError()) {
      return ApiGatewayResponseService.Error(serviceRes.error);
    }
    return ApiGatewayResponseService.Success(serviceRes.data);
  } catch (e) {
    console.error(e);
    return ApiGatewayResponseService.Error(e);
  }
};
