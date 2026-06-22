import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 6003;
  await app.listen(port);
  console.log(`Github Service is running on: http://localhost:${port}`);
}
bootstrap();
