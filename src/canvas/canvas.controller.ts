import { Controller, Get } from '@nestjs/common';
import { CanvasService } from './canvas.service';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get('randomImage')
  async getRandomImage(): Promise<string> {
    const {
      urls: { regular: url },
    } = await this.canvasService.random().toPromise();
    return url;
  }
}
