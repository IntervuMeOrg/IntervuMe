import { userService } from "../user/user.service.js";
import {
  SignUpRequestBody,
  SignInRequestBody,
  AuthResponse,
} from "./authentication-types.js";
import {
  GoogleUserInfo,
  UserIdentityProvider,
  UserRole,
} from "../user/user-types.js";
import { AppDataSource } from "../database/data-source.js";
import { profileService } from "../profile/profile.service.js";

export const authService = {  
  async signUp(
    request: SignUpRequestBody,
    jwtSign: (payload: any) => string
  ): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await userService.getByEmail(request.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const { user, profile } = await AppDataSource.transaction(
      async (manager) => {
        const user = await userService.create(
          {
            email: request.email,
            password: request.password,
            provider: request.provider,
            role: UserRole.USER,
            tokenVersion: "0",
          },
          { manager }
        );

        const profile = await profileService.create(
          {
            firstName: request.profile.firstName,
            lastName: request.profile.lastName,
            phone: request.profile.phone,
            gender: request.profile.gender,
            dob: request.profile.dob,
          },
          user,
          { manager }
        );

        return { user, profile };
      }
    );

    // Generate JWT token
    const token = jwtSign({
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      ...profile,
      token,
    };
  },

  async signInWithPassword(
    request: SignInRequestBody,
    jwtSign: (payload: any) => string
  ): Promise<AuthResponse> {
    // Find user by email
    const user = await userService.getByEmail(request.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.provider === UserIdentityProvider.GOOGLE) {
      
      throw new Error("Invalid email or password");
    } 

    // Validate password
    if (user.provider === UserIdentityProvider.EMAIL) {
      if (!user.password) {
        throw new Error("Invalid email or password");
      }

      const isValidPassword = await userService.validatePassword(
        request.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }
    }

    // Generate JWT token
    const token = jwtSign({
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    const profile = await profileService.getByUserId(user.id);

    return {
      ...userWithoutPassword,
      ...profile,
      token,
    };
  },

  async signInWithGoogle(
    request: GoogleUserInfo,
    jwtSign: (payload: any) => string
  ): Promise<AuthResponse> {
    // Check if user already exists
    
    let existingUser = await userService.getByEmail(request.email);

    if (!existingUser) {
      // Create new social user with transaction
      const { user, profile } = await AppDataSource.transaction(
        async (manager) => {
          const user = await userService.create(
            {
              email: request.email,
              provider: request.provider,
              role: UserRole.USER,
              tokenVersion: "0",
              password: "", // Empty password for social auth users
            },
            { manager }
          );

          const profile = await profileService.create(
            {
              firstName: request.firstName,
              lastName: request.lastName,
            },
            user,
            { manager }
          );

          return { user, profile };
        }
      );

      existingUser = user;
    }

    // Generate JWT token
    const token = jwtSign({
      sub: existingUser.id,
      role: existingUser.role,
      tokenVersion: existingUser.tokenVersion,
    });

    // Get user profile
    const profile = await profileService.getByUserId(existingUser.id);

    // Return user without password
    const { password, ...userWithoutPassword } = existingUser;

    return {
      ...userWithoutPassword,
      ...profile,
      token,
    };
  },
};
