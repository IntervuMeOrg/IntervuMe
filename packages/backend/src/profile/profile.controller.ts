import { ProfileInput, UpdateProfileRequest } from "./profile-types";
import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { profileService } from "./profile.service";



export const profileController: FastifyPluginAsyncTypebox = async (app) => {
    app.addHook('onRequest', app.authenticate);

    app.get('/', {
        schema: {
            response: {
            200: ProfileInput,
            400: Type.Object({ message: Type.String()})
            }
      }
    }, async (request, reply) => {
        const userId = request.user.sub;
        const profile = await profileService.getByUserId(userId);
        if (!profile) {
            return reply.code(404).send({ message: 'Profile not found' });
        }       
        return profile;
    });

    app.put('/', {
        schema: {
            body: UpdateProfileRequest,
            response: {
                200: ProfileInput,
                400: Type.Object({ message: Type.String()} )
            }
        }
    }, async(request, reply) => {
        const userId = request.user.sub;
        const updates = request.body as UpdateProfileRequest;
        try{
            const updatedProfile = await profileService.update(userId, updates);
            return updatedProfile;
        }catch(err){
            return reply.code(400).send({message: (err as Error).message});
        }
    })
}