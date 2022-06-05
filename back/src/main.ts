import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import config from 'config';

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);

    const port = config.get<number>('server.port');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('users api test')
        .setDescription('nest js swagger test')
        .setVersion('1.0.0')
        .addTag('users')
        .addBearerAuth()
        .build();

    const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocs);

    await app.listen(port);
    logger.log(`application run in ${port}`);
}
bootstrap();
