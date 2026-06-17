import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common/services/logger.service';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 6001;
  await app.listen(port);
  Logger.log(`Auth service is running on port ${port}`, 'Bootstrap');
}
bootstrap();
