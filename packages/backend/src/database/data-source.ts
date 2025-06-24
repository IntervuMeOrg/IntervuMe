import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../user/user.entity.js";
import { ProfileEntity } from "../profile/profile.entity.js";
import { CodingQuestionEntity } from "../codingQuestion/codingQuestion.entity.js";
import { TestCaseEntity } from "../testCase/testCase.entity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "intervume",
    synchronize: process.env.NODE_ENV === "development", // Only for development
    logging: false,
    entities: [UserEntity, ProfileEntity, CodingQuestionEntity, TestCaseEntity],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: ["src/database/subscribers/*.ts"],
}); 