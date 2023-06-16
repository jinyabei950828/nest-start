import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { ExceptionModule } from './modules/exception/exception.module';

@Module({
  imports: [HelloModule, ExceptionModule],
})
export class AppModule {
  //为hello添加日志中间件(排除post的方法)
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
