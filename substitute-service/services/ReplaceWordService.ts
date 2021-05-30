import ServiceResponse from "../../core/models/service.response.model";
import { DynamoDbManager } from "./../actions/DynamoDB";

export class ReplaceWordService {
  async ReplaceWord(sentence) {
    try {
      const words = await new DynamoDbManager(process.env.DYNAMO_DB_TABLE).getAllWords();
      const object = words.reduce((obj, item) => (obj[item.word] = item.substitute, obj) ,{});

      const re = new RegExp(Object.keys(object).join("|"),"gi");
      sentence = sentence.replace(re, matched => object[matched]);
      return ServiceResponse.OK(sentence);
    } catch (e) {
      return ServiceResponse.Error(e);
    }
  }
}