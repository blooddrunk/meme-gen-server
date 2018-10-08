import { Query, Resolver } from '@nestjs/graphql';
import { CanvasService } from './canvas.service';

@Resolver()
export class CanvasResolver {
  constructor(private readonly canvasService: CanvasService) {}

  @Query('randomImage')
  async getRandomImage(): Promise<string> {
    const {
      urls: { regular: url },
    } = await this.canvasService.random().toPromise();
    return url;
  }
}
