import { AppDataSource } from "../../database/data-source";
import { McqOptionEntity } from "./mcq-option.entity";
import {
  apId,
  CreateMcqOptionRequestBody,
  McqOption,
  UpdateMcqOptionRequestBody,
} from "@shared";
import { isNil } from "../../common/utils";

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

  async get(id: string): Promise<McqOption> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (isNil(McqOption)) throw new Error("Mcq Option not found");

    return McqOption;
  },

  async update(
    id: string,
    updates: UpdateMcqOptionRequestBody
  ): Promise<McqOption> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (isNil(McqOption)) throw new Error("Mcq Option not found");

    Object.assign(McqOption, updates, { updated: new Date().toISOString() });
    return await McqOptionRepositoy().save(McqOption);
  },

  async delete(id: string): Promise<void> {
    const McqOption = await McqOptionRepositoy().findOne({ where: { id } });
    if (isNil(McqOption)) throw new Error("Mcq Option not found");

    McqOptionRepositoy().remove(McqOption);
  },
};
