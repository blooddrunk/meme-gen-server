import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { CanvasModule } from './canvas/canvas.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    CanvasModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.schema.ts'),
        outputAs: 'class',
      },
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
