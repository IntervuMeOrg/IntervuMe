import { apId, ProfileInput, UpdateProfileBody, Profile, User } from '@shared';
import { ProfileEntity } from './profile.entity';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { isNil } from '../common/utils.js';

const profileRepository = () => {
  return AppDataSource.getRepository(ProfileEntity);
};

export const profileService = {
  async create(
    request: ProfileInput,
    user: User,
    opts: { manager?: EntityManager } = {}
  ): Promise<Profile> {
    const repo = opts.manager
      ? opts.manager.getRepository(ProfileEntity)
      : profileRepository();

    const profile = repo.save({
      id: apId(),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      ...request,
      userId: user.id,
    });

    return profile;
  },

  async update(userId: string, updates: UpdateProfileBody): Promise<Profile> {
    const profile = await profileRepository().findOne({ where: { userId } });
    if (isNil(profile)) throw new Error('Profile not found');

    Object.assign(profile, updates, { updated: new Date().toISOString() });
    const updatedProfile = await profileRepository().save(profile);

    return updatedProfile;
  },

  async getByUserId(userId: string): Promise<Profile> {
    return await profileRepository().findOneOrFail({ where: { userId } });
  },
};
