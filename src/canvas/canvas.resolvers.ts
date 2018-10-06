import { Query, Resolver } from '@nestjs/graphql';
import { CanvasService } from './canvas.service';
import { RemoteImage } from '../graphql.schema';

@Resolver('Canvas')
export class CanvasResolver {
  constructor(private readonly canvasService: CanvasService) {}

  @Query('randomImage')
  async getRandomImage(): Promise<RemoteImage> {
    const { id, urls } = await this.canvasService.random().toPromise();
    return {
      id,
      url: urls.regular,
    };
  }
}
