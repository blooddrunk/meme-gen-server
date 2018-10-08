import { Module, HttpModule } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasResolver } from './canvas.resolvers';
import { CanvasController } from './canvas.controller';

@Module({
  imports: [HttpModule],
  providers: [CanvasService, CanvasResolver],
  controllers: [CanvasController],
})
export class CanvasModule {}
