import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // Note: NodeNext schema tracking requires explicit '.js' extension matching configuration properties standard setup

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
