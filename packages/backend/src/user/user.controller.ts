import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { userService } from './user.service.js';
import { ForgotPasswordRequest, ResetPasswordRequest, UpdateUserRequest, User } from './user-types.js';
import { request } from 'http';
import { tr } from 'zod/v4/locales';


export const userController: FastifyPluginAsyncTypebox = async (app) => {
    app.addHook('onRequest', app.authenticate);

    app.get('/profile', {
        schema: {
            response: {
            200: User
            }
      }
    }, async (request, reply) => {
        const userId = request.user.sub;
        const user = await userService.getById(userId);
        if (!user) {
            return reply.code(404).send({ message: 'User not found' });
        }       
        return user;
    });

    
    app.get('/admin/users', async (request, reply) => {
        if(request.user.role !== 'admin'){
            return reply.code(403).send({message: 'Forbidden: admins only'})
        }

        const users = await userService.list();
        return {
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        };
    });

    app.put('/', {
        schema: {
            body : UpdateUserRequest,
            response: {
                200: Type.Omit(User, ['password'])
            }
        }
    }, async(request, reply) => {
        const userId = request.user.sub;
        const updates = request.body as UpdateUserRequest;

        try{
            const updatedUser = await userService.update(userId, updates);
            const {password, ...rest} = updatedUser;

            return rest;
        }catch (err){
            return reply.code(400).send({message: (err as Error).message});
        }
    });

    app.delete('/', {
        schema: {
            response: {
                204: Type.Null(),
                400: Type.Object({ message: Type.String() })
            }
        }
    }, async(request, reply) => {
        const userId = request.user.sub;

        try{
            await userService.delete(userId);
            return reply.code(204).send();
        }catch(err){
            return reply.code(400).send({message: (err as Error).message});
        }
    });

    app.post('/logout', {
        schema: {
            response: {
                200: Type.Object({ message: Type.String() }),
                400: Type.Object({ message: Type.String() }),
            }
        }
    }, async(request, reply) => {
        const userId = request.user.sub;

        try{
            await userService.logout(userId);
            return reply.code(200).send({message: 'Logged out successfully'});
        }catch(err){
            return reply.code(400).send({message: (err as Error).message});
        }
    });

    app.post('/forgot-password', {
        schema:{
            body: ForgotPasswordRequest,
            response:{
                200: Type.Object({ message: Type.String() }),
                400: Type.Object({ message: Type.String() }),
            }
        }
    }, async(request, reply) =>{
        const email = (request.body as ForgotPasswordRequest).email;
        try{
            await userService.initializePasswordReset(email);
            return reply.code(200).send({message: 'Reset code sent to your email'});
        }catch(err){
            return reply.code(400).send({message: (err as Error).message});
        }
    });

    app.post('/reset-password', {
        schema: {
            body: ResetPasswordRequest,
            response:{
                200: Type.Object({ message: Type.String() }),
                400: Type.Object({ message: Type.String() }),
            }
        }
    }, async(request, reply) =>{
        const data = request.body as ResetPasswordRequest;
        try{
            await userService.resetPassword(data);
            return reply.code(200).send({message: 'Password reset successfully'});
        }catch(err){
            return reply.code(400).send({message: (err as Error).message});
        }
    });

}; 