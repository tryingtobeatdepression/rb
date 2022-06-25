import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global prefix 'api'
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  // Allow to set the Nest Container to be used by the 'class-validator' lib.
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });
}
bootstrap();
