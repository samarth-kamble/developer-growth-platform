import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@workspace/database';

@Injectable()
export class UsersService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        experienceLevel: true,
        techStack: true,
        goals: true,
        onboardingCompleted: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, data: any) {
    try {
      // Ensure we only update allowed fields
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: data.username,
          role: data.role,
          experienceLevel: data.experienceLevel,
          techStack: data.techStack,
          goals: data.goals,
          ...(data.onboardingCompleted !== undefined && { onboardingCompleted: data.onboardingCompleted }),
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          experienceLevel: true,
          techStack: true,
          goals: true,
        },
      });

      return updatedUser;
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        throw new Error('Username is already taken');
      }
      throw error;
    }
  }
}
