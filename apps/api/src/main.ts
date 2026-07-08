import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
app.useGlobalInterceptors(
  new ResponseInterceptor(),
);
app.useGlobalFilters(
  new HttpExceptionFilter(),
);
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Kaka Digital Image API')
    .setDescription('Photography ERP Backend API')
    .setVersion('1.0.0')
    .addBearerAuth(
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Enter JWT token',
  },
  'JWT',
)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);

  console.log(
    `🚀 API running on http://localhost:${process.env.PORT ?? 3001}/api`,
  );

  console.log(
    `📚 Swagger Docs: http://localhost:${process.env.PORT ?? 3001}/api/docs`,
  );
}

bootstrap();