import ServiceResponse from "../../core/models/service.response.model";
import { DynamoDbManager } from '../actions/DynamoDB';

export class AddWordService {
  async AddWord(word, substitute) {
    try {
      await new DynamoDbManager(process.env.DYNAMO_DB_TABLE).addWordSubstitution(word, substitute);
      return ServiceResponse.OK();
    } catch (e) {
      return ServiceResponse.Error(e);
    }
  }
}