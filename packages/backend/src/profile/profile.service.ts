import { ProfileInput, UpdateProfileRequest } from "./profile-types";
import { Profile } from "./profile-entity-types";
import { ProfileEntity } from "./profile.entity";
import { EntityManager } from "typeorm";
import { apId } from "../common/id-generator";
import { AppDataSource } from "../database/data-source";

const profileRepository = () => {
    return AppDataSource.getRepository(ProfileEntity);
};

export const profileService = {
    async create(request: ProfileInput, userId: string, opts: { manager?: EntityManager } = {}): Promise<Profile> {
        const repo = opts.manager
        ? opts.manager.getRepository(ProfileEntity)
        : profileRepository();

        const profile = repo.create({
            id: apId(),
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            ...request,
            userId: userId
        });

        return await repo.save(profile);
    },

    async update(userId: string, updates: UpdateProfileRequest): Promise<ProfileInput>{
        const profile = await profileRepository().findOne({ where: { userId } });
        if(!profile)
            throw new Error('Profile not found');

        Object.assign(profile, updates, { updated: new Date().toISOString() });
        const updatedProfile = await profileRepository().save(profile);

        return {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        gender: updatedProfile.gender,
        dob: updatedProfile.dob,
        phone: updatedProfile.phone,
        };
    },

    async getByUserId(userId: string): Promise<Profile | null> {
        return await profileRepository().findOne({ where: { userId } });
    },
}