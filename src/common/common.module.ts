import { Module, Global } from '@nestjs/common';
import { DateScalar } from './scalers/date.scaler';

@Global()
@Module({
  providers: [DateScalar],
})
export class CommonModule {}
