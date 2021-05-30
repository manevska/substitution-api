import { APIGatewayProxyHandler } from "aws-lambda";
import { AddWordService } from "@services/AddWordService";
import { ApiGatewayResponseService } from 'substitution-api-core/services/ApiGatewayResponse.service';
import { WordRequest } from "@root/models/word.request.model";

export const AddWord: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    console.log('1 log', event.body);
    const addWordService = new AddWordService();
    let body = JSON.parse(event.body) as WordRequest;
    let wordRes = await addWordService.AddWord(body.word, body.substitute);
    if (wordRes.isError()) {
      return ApiGatewayResponseService.Error(wordRes.error);
    }
    return ApiGatewayResponseService.Success(wordRes.data);
  } catch (e) {
    console.error(e);
    return ApiGatewayResponseService.Error(e);
  }
};
