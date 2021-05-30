import { DynamoDB } from 'aws-sdk';

export class DynamoDbManager {
  private readonly dynamoDbSvc: DynamoDB.DocumentClient;
  constructor(private readonly tableName: string) {
    this.dynamoDbSvc = new DynamoDB.DocumentClient({
      region: process.env.REGION
    });
  }

  async getAllWords() {
    const params = {
      TableName: this.tableName,
    } as DynamoDB.DocumentClient.ScanInput;
    const response = await this.dynamoDbSvc.scan(params).promise();
    return response.Items;
  }

  addWordSubstitution(word: string, substitute: string) {
    const item = {
      word,
      substitute,
    };
    const params = {
      TableName: this.tableName,
      Item: item,
    };
    return this.dynamoDbSvc.put(params).promise();
  }
}
