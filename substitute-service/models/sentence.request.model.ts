export class SentenceRequest {
  sentence: string;

  constructor(init: Partial<SentenceRequest>) {
    Object.assign(this, init);
  }
}