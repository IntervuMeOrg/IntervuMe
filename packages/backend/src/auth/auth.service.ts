import { userService } from "../user/user.service.js";
import { SignUpRequest, SignInRequest } from "../auth/auth-types.js";
import { User, UserRole } from "../user/user-types.js";
import { AppDataSource } from "../database/data-source.js";
import { profileService } from "../profile/profile.service.js";

export type AuthResponse = {
    success: boolean;
    data: {
        user: Omit<User, 'password'>;
        token: string;
    };
    message: string;
}

export const authService = {
    async signUp(request: SignUpRequest, jwtSign: (payload: any) => string): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = await userService.getByEmail(request.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const { user, profile } = await AppDataSource.transaction(async manager => {
      
        const user = await userService.create(
            {
            email: request.email,
            password: request.password,
            provider: request.provider,
            role: UserRole.USER,
            tokenVersion: '0',
            },
            { manager }
        )

        const profile = await profileService.create(
            {
                firstName: request.profile.firstName,
                lastName: request.profile.lastName,
                phone: request.profile.phone,
                gender: request.profile.gender,
                dob: request.profile.dob,
            },
            user.id,
            { manager }
        )

            return { user, profile }
        })


        // Generate JWT token
        const token = jwtSign({
            sub: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        });

        // Return user without password
        const { password, ...userWithoutPassword } = user;

        return {
            success: true,
            data: {
                user: userWithoutPassword,
                token
            },
            message: 'User registered successfully'
        };
    },

    async signInWithPassword(request: SignInRequest, jwtSign: (payload: any) => string): Promise<AuthResponse> {
        // Find user by email
        const user = await userService.getByEmail(request.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Validate password
        const isValidPassword = await userService.validatePassword(request.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwtSign({
            sub: user.id,
            role: user.role,
            tokenVersion: user.tokenVersion,
        });

        // Return user without password
        const { password, ...userWithoutPassword } = user;

        return {
            success: true,
            data: {
                user: userWithoutPassword,
                token
            },
            message: 'Signed in successfully'
        };
    }
};
