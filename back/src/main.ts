import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('users api test')
    .setDescription('nest js swagger test')
    .setVersion('1.0.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocs);
  await app.listen(5001);
}
bootstrap();
