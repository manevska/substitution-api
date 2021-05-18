import ServiceResponse from "../../core/models/service.response.model";
import { ReplacableWords } from "@root/constants/ReplacableWords";

export class ReplaceWordService {
  async ReplaceWord(sentence) {
    try {
      const re = new RegExp(Object.keys(ReplacableWords).join("|"),"gi");
      sentence = sentence.replace(re, matched => ReplacableWords[matched]);
      return ServiceResponse.OK(sentence);
    } catch (e) {
      return ServiceResponse.Error(e);
    }
  }
}