import { AppDataSource } from "../database/data-source";
import { apId } from "../common/id-generator";
import { MCQOptionEntity } from "./mcqOption.entity";
import { CreateMCQOptionSchema, MCQOptionSchema, UpdateMCQOptionSchema } from "./mcqOption-types";

const MCQOptionRepositoy = () => {
  return AppDataSource.getRepository(MCQOptionEntity);
};

export const mcqOptionService = {
  async create(request: CreateMCQOptionSchema): Promise<MCQOptionSchema> {
    const mcqOption = MCQOptionRepositoy().create({
      id: apId(),
      ...request,
    });

    return await MCQOptionRepositoy().save(mcqOption);
  },

  async getById(id: string): Promise<MCQOptionSchema | null>{
    const mcqOption = await MCQOptionRepositoy().findOne({ where: { id } });
    if(!mcqOption)
        throw new Error('MCQ Option not found');

    return mcqOption;
  },

  async update(id: string, updates: UpdateMCQOptionSchema): Promise<MCQOptionSchema | null>{
    const mcqOption = await MCQOptionRepositoy().findOne({ where: { id } });
    if(!mcqOption)
        throw new Error('MCQ Option not found');

    Object.assign(mcqOption, updates, {updated: new Date().toISOString()});
    return await MCQOptionRepositoy().save(mcqOption);
  },

  async delete(id: string): Promise<void>{
    const mcqOption = await MCQOptionRepositoy().findOne({ where: { id } });
    if(!mcqOption)
        throw new Error('MCQ Option not found');

    MCQOptionRepositoy().remove(mcqOption);
  },

};
