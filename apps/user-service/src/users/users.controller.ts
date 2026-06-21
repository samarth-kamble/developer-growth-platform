import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { z } from 'zod';

const updateProfileSchema = z.object({
  role: z.string().min(2).optional(),
  experienceLevel: z.string().min(1).optional(),
  techStack: z.array(z.string()).max(20).optional(),
  goals: z.array(z.string()).max(10).optional(),
  onboardingCompleted: z.boolean().optional(),
});

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    // req.user is injected by the AuthGuard
    return this.usersService.getProfile(req.user.id);
  }

  @Put('me')
  async updateMe(@Req() req: any, @Body() body: any) {
    const validatedData = updateProfileSchema.parse(body);
    return this.usersService.updateProfile(req.user.id, validatedData);
  }
}
