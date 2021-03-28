import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CrudConfigService } from '@nestjsx/crud';
CrudConfigService.load({
  query: {
    limit: 20,
    softDelete: true,
    alwaysPaginate: true,
  },
});
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { HttpResInterceptor } from './interceptor/http-res.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const apiPrefix = configService.get('API_PREFIX');
  app.setGlobalPrefix(apiPrefix);

  const options = new DocumentBuilder()
    .setTitle('Sign up together')
    .setDescription('The API of Sign up together')
    .setVersion('1.0')
    // .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalInterceptors(new HttpResInterceptor(reflector));

  await app.listen(configService.get('SERVER_PORT'));
}

bootstrap();
