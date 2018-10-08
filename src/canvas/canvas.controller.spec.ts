import { Test, TestingModule } from '@nestjs/testing';
import { CanvasController } from './canvas.controller';

describe('Canvas Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CanvasController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CanvasController = module.get<CanvasController>(CanvasController);
    expect(controller).toBeDefined();
  });
});
