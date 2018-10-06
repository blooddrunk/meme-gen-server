import { Module, HttpModule } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasResolver } from './canvas.resolvers';

@Module({
  imports: [HttpModule],
  providers: [CanvasService, CanvasResolver],
})
export class CanvasModule {}
