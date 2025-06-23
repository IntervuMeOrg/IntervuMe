import nodemailer from 'nodemailer';
import { User, UserRole, UserIdentityProvider, CreateUserRequest, UpdateUserRequest} from "./user-types.js";
import { UserEntity } from "./user.entity.js";
import { AppDataSource } from "../database/data-source.js";
import bcrypt from "bcrypt";
import { apId } from "../common/id-generator.js";
import { addMinutes, isBefore } from 'date-fns';
import { ResetPasswordRequest } from '../auth/auth-types.js';
import { EntityManager } from 'typeorm';

const userRepository = () => {
    return AppDataSource.getRepository(UserEntity);
};

export const userService = {
    async create(request: CreateUserRequest, opts: { manager?: EntityManager } = {}): Promise<User> {
        const repo = opts.manager
        ? opts.manager.getRepository(UserEntity)
        : userRepository();

        const { password, ...userData } = request;
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = repo.create({
            id: apId(),
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            ...userData,
            password: hashedPassword,
            role: request.role || UserRole.USER,
            provider: request.provider || UserIdentityProvider.EMAIL
        });

        return await repo.save(user);
    },

    async update(id: string, updates: UpdateUserRequest): Promise<User>{
        const user = await userRepository().findOne({ where: { id } });
        if (!user) throw new Error('User not found');
  
        Object.assign(user, updates, { updated: new Date().toISOString() });
        return await userRepository().save(user);
    },

    async delete(id : string): Promise<void>{
        const user = await userRepository().findOne({ where: { id } });
        if (!user) throw new Error('User not found');

        await userRepository().remove(user);
    },

    async logout(id : string): Promise<void>{
        const user = await userRepository().findOne({ where: { id } });
        if (!user) throw new Error('User not found');

        user.tokenVersion = (user.tokenVersion ?? '0');
        user.tokenVersion = (user.tokenVersion + 1).toString();
        user.updated = new Date().toISOString();
        userRepository().save(user);
    },

    async initializePasswordReset(email: string) : Promise<void>{
        const user = await userRepository().findOne({ where: { email } });
        if (!user) throw new Error('Email not registered');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.resetToken = hashedOtp;
        user.resetTokenExpiry = addMinutes(new Date(), 15);

        await userRepository().save(user);

        const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
        });

        await transporter.sendMail({
        to: user.email,
        subject: 'Your password reset code',
        text: `Your code is ${otp}. It expires in 15 minutes.`
        });
    },

    async resetPassword(request: ResetPasswordRequest): Promise<void>{
        const email = request.email;
        const user = await userRepository().findOne({ where: { email }});

        if (!user || !user.resetToken || !user.resetTokenExpiry) 
            throw new Error('Invalid or Expired reset code');

        if(isBefore(user.resetTokenExpiry, new Date()))
            throw new Error('Reset code has expired');

        const isMatch = await bcrypt.compare(request.otp, user.resetToken);
        if(!isMatch)
            throw new Error('Invalid reset code');

        user.password = await bcrypt.hash(request.password, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        user.tokenVersion = ((user.tokenVersion ?? '0') + 1).toString();
        user.updated = new Date().toISOString();

        userRepository().save(user);
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
            select: ['id', 'email', 'role', 'created', 'updated']
        });
    }
}; 
