export class WordRequest {
  word: string;
  substitute: string

  constructor(init: Partial<WordRequest>) {
    Object.assign(this, init);
  }
}