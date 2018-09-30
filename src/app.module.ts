import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CanvasModule } from './canvas/canvas.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CanvasModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
