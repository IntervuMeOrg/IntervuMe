import { Repository } from "typeorm";
import { User, UserRole, UserIdentityProvider, CreateUserRequest } from "./user-types.js";
import { UserEntity } from "./user.entity.js";
import { AppDataSource } from "../database/data-source.js";
import bcrypt from "bcrypt";
import { apId } from "../common/id-generator.js";

const userRepository = () => {
    return AppDataSource.getRepository(UserEntity);
};

export const userService = {
    async create(request: CreateUserRequest): Promise<User> {
        const { password, ...userData } = request;
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = userRepository().create({
            id: apId(),
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            ...userData,
            password: hashedPassword,
            role: request.role || UserRole.USER,
            provider: request.provider || UserIdentityProvider.EMAIL
        });

        return await userRepository().save(user);
    },

    async getByEmail(email: string): Promise<User | null> {
        return await userRepository().findOne({ where: { email } });
    },

    async getById(id: string): Promise<User | null> {
        return await userRepository().findOne({ where: { id } });
    },

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    async list(): Promise<Partial<User>[]> {
        return await userRepository().find({
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'created', 'updated']
        });
    }
}; 