import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.headers.cookie;

    if (!cookie) {
      throw new UnauthorizedException('No session cookie provided');
    }

    try {
      // Ping the auth-service to verify the session
      // In a real microservice environment, this URL would be injected via ConfigService
      const authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8080/api/auth';
      
      const response = await fetch(`${authUrl}/get-session`, {
        headers: { cookie },
      });

      if (!response.ok) {
        throw new UnauthorizedException('Invalid or expired session');
      }

      const sessionData = await response.json();
      
      if (!sessionData || !sessionData.user) {
        throw new UnauthorizedException('Invalid session data');
      }

      // Attach the user object to the request so controllers can access it
      request.user = sessionData.user;
      return true;
    } catch (error) {
      console.error('AuthGuard verification failed:', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
