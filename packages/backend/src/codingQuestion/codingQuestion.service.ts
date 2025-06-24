import { AppDataSource } from "../database/data-source";
import { CodingQuestionEntity } from "./codingQuestion.entity";
import { CreateCodingQuestionSchema } from "./codingQuestion-types";
import { apId } from "../common/id-generator";

const codingQuestionRepository = () => {
  return AppDataSource.getRepository(CodingQuestionEntity);
};

export const codingQuestionService = {
  async create(request: CreateCodingQuestionSchema) {
    const { testCases, isActive = true, ...questionFields } = request;

    const normalizedTestCases = testCases.map(
      ({ input, expectedOutput, isHidden = false }) => ({
        id: apId(),
        input,
        expectedOutput,
        isHidden,
      })
    );

    const codingQuestion = codingQuestionRepository().create({
        id: apId(),
        ...questionFields,
        isActive,
        testCases: normalizedTestCases,
    });
    
    return await codingQuestionRepository().save(codingQuestion);
  },

};
