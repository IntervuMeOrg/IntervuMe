import { AppDataSource } from "../../database/data-source";
import { apId } from "../../common/id-generator";
import { McqOptionEntity } from "./mcq-option.entity";
import {
  CreateMcqOptionRequestBody,
  McqOption,
  UpdateMcqOptionRequestBody,
} from "./mcq-option-types";

const McqOptionRepositoy = () => {
  return AppDataSource.getRepository(McqOptionEntity);
};

export const McqOptionService = {
  async create(request: CreateMcqOptionRequestBody): Promise<McqOption> {
    const McqOption = McqOptionRepositoy().create({
      id: apId(),
      ...request,
    });

    return await McqOptionRepositoy().save(McqOption);
  },

  async getById(id: string): Promise<McqOption | null> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (!McqOption) throw new Error("Mcq Option not found");

    return McqOption;
  },

  async update(
    id: string,
    updates: UpdateMcqOptionRequestBody
  ): Promise<McqOption | null> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (!McqOption) throw new Error("Mcq Option not found");

    Object.assign(McqOption, updates, { updated: new Date().toISOString() });
    return await McqOptionRepositoy().save(McqOption);
  },

  async delete(id: string): Promise<void> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (!McqOption) throw new Error("Mcq Option not found");

    McqOptionRepositoy().remove(McqOption);
  },
};
