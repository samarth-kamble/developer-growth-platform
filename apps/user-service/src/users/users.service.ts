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
    // Ensure we only update allowed fields
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: data.role,
        experienceLevel: data.experienceLevel,
        techStack: data.techStack,
        goals: data.goals,
        ...(data.onboardingCompleted !== undefined && { onboardingCompleted: data.onboardingCompleted }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        experienceLevel: true,
        techStack: true,
        goals: true,
      },
    });

    return updatedUser;
  }
}
