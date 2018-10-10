import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
// import { TranformInterceptor } from './common/interceptors/tranform.interceptor';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as fs from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const isHttpsEnabled = process.env.ENABLE_HTTPS === 'true';

  const server = express();
  const app = await NestFactory.create(AppModule, server, {
    cors: true,
  });
  app
    .use(helmet())
    // .use(csurf());
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(
      new TimeoutInterceptor(),
      // new TranformInterceptor(),
    );
  // .useStaticAssets(__dirname, {
  //   dotfiles: 'allow',
  // });
  await app.init();

  const configService: ConfigService = app.get('ConfigService');

  http.createServer(server).listen(configService.port, () => {
    if (process.send) {
      process.send('ready');
    }
  });

  if (isHttpsEnabled) {
    const domainName = configService.domainName;
    const httpsOptions = {
      key: fs.readFileSync(`/etc/letsencrypt/live/${domainName}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${domainName}/cert.pem`),
      ca: fs.readFileSync(`/etc/letsencrypt/live/${domainName}/chain.pem`),
    };
    https.createServer(httpsOptions, server).listen(443);
  }
  // gracefully stop
  // process.on('SIGINT', () => {
  //   process.exit(0);
  // });
}
bootstrap();
