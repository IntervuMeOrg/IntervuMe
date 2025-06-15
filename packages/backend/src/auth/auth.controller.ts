import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { authService } from './auth.service.js'
import { SignUpRequest, SignInRequest, UserIdentityProvider } from '../user/user-types.js'

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
};

