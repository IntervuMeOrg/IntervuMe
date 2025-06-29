import { AppDataSource } from "../database/data-source";
import { InterviewSchema } from "./interview-types";
import { InterviewEntitySchema } from "./interview.entity";

const interviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntitySchema);
};

export const interviewService = {
  async getById(id: string): Promise<InterviewSchema | null> {
      const interview = await interviewRepository().findOne({where: { id }});
  
      if (!interview) {
        throw new Error('Interview not found');
      }
  
      return interview;
    },
}