import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // এই লাইনটি অবশ্যই থাকতে হবে
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO-র বাইরে অতিরিক্ত ডাটা আসলে তা ফিল্টার করে দেবে
    transform: true, // ইনপুট ডাটাকে অটোমেটিক সঠিক টাইপে রূপান্তর করবে
  }));

  await app.listen(3000);
}
bootstrap();
