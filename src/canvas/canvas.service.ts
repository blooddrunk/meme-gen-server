import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CanvasService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  random() {
    return this.http
      .get(
        `https://api.unsplash.com/photos/random/?client_id=${
          this.config.unsplashAccessKey
        }`,
      )
      .pipe(map(response => response.data));
  }
}
