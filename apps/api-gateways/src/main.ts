import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-execution.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port);

  const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:6001';
  Logger.log(`API Gateway Server is running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`Auth Service --> Proxying /api/auth to ${authServiceUrl}`, 'ProxyRouting');
}
void bootstrap();
