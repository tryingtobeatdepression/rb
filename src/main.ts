import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global prefix 'api'
  app.setGlobalPrefix('/api')
  await app.listen(3000);
}
bootstrap();
