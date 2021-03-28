import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { HttpSuccessResponse } from '@/interfaces/http.interface';
import { HttpErrorCode } from '@/constants/http-error-code';
import { META_RES_MSG } from '@/constants/meta-data';
import { THttpResponseMsg } from '@/decorators/http.decorator';

@Injectable()
export class HttpResInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<HttpSuccessResponse | any> {
    let message = 'success';
    // set default code -> 200
    let httpCode: number = HttpStatus.OK;
    const metadata = this.reflector.get<THttpResponseMsg | string>(
      META_RES_MSG,
      context.getHandler(),
    );
    if (metadata) {
      if (Array.isArray(metadata)) {
        [message, httpCode] = metadata;
      } else {
        message = metadata;
      }
    }
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    res.status(httpCode);

    return next.handle().pipe(
      map(result => ({
        errno: HttpErrorCode.SUCCESS,
        message,
        result,
      })),
    );
  }
}
