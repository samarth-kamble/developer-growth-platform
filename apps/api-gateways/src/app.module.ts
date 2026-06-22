import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        createProxyMiddleware({
          target: process.env.AUTH_SERVICE_URL || 'http://localhost:6001',
          changeOrigin: true,
          pathRewrite: (path) => `/api/auth${path}`,
          on: {
            proxyReq: fixRequestBody,
          },
        }),
      )
      .forRoutes('/api/auth');

    consumer
      .apply(
        createProxyMiddleware({
          target: process.env.USER_SERVICE_URL || 'http://localhost:6002',
          changeOrigin: true,
          pathRewrite: (path) => `/api/users${path}`,
          on: {
            proxyReq: fixRequestBody,
          },
        }),
      )
      .forRoutes('/api/users');

    consumer
      .apply(
        createProxyMiddleware({
          target: process.env.GITHUB_SERVICE_URL || 'http://localhost:6003',
          changeOrigin: true,
          pathRewrite: (path) => `/api/github${path}`,
          on: {
            proxyReq: fixRequestBody,
          },
        }),
      )
      .forRoutes('/api/github');
  }
}
