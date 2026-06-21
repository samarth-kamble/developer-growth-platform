import { Controller, Get, Put, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { z } from 'zod';

const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").optional(),
  role: z.string().min(2).optional(),
  experienceLevel: z.string().min(1).optional(),
  techStack: z.array(z.string()).max(20).optional(),
  goals: z.array(z.string()).max(10).optional(),
  onboardingCompleted: z.boolean().optional(),
});

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getMe(@Req() req: any) {
    // req.user is injected by the AuthGuard
    return this.usersService.getProfile(req.user.id);
  }

  @Put('me')
  async updateMe(@Req() req: any, @Body() body: any) {
    try {
      const validatedData = updateProfileSchema.parse(body);
      return await this.usersService.updateProfile(req.user.id, validatedData);
    } catch (e: any) {
      console.error("DEBUG UsersController PUT error:", e);
      throw new BadRequestException(e.message || e);
    }
  }
}

