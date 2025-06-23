import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { authService } from './auth.service.js'
import { SignUpRequest, SignInRequest, UserIdentityProvider, ForgotPasswordRequest, ResetPasswordRequest } from '../user/user-types.js'
import { userService } from '../user/user.service.js';

export const authenticationController: FastifyPluginAsyncTypebox = async (
    app,
) => {
    app.post('/sign-up', {
        schema: {
            body: SignUpRequest
        }
    }, async (request) => {
        const body = request.body as SignUpRequest;
        
        const signUpResponse = await authService.signUp({
            ...body,
            provider: UserIdentityProvider.EMAIL,
        }, app.jwt.sign);

        return signUpResponse;
    });

    app.post('/sign-in', {
        schema: {
            body: SignInRequest
        }
    }, async (request) => {
        const body = request.body as SignInRequest;
        
        const response = await authService.signInWithPassword(body, app.jwt.sign);

        return response;
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

