import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { userService } from './user.service.js';

export const userController: FastifyPluginAsyncTypebox = async (app) => {
    // Get current user profile
    app.get('/profile', async () => {
        // For now, we'll implement this after setting up JWT properly
        return {
            success: true,
            message: 'Profile endpoint - implement JWT verification'
        };
    });

    // Get all users
    app.get('/all', async () => {
        const users = await userService.list();
        return {
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        };
    });
}; 