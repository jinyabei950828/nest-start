import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // //全局过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // //全局管道
  // app.useGlobalPipes(new ValidationPipe());

  //设置swagger文档相关配置(nestjs/swagger 6点几的依赖会有问题)
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-start api document')
    .setDescription('nest starter project api docuement')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
