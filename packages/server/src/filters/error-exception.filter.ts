import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpErrorResponse } from '@/interfaces/http.interface';
import { HttpErrorCode } from '@/constants/http-error-code';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    Logger.log(
      `ErrorExceptionFilter ${JSON.stringify({
        path: request.url,
        data: request.body,
      })}`,
    );

    const isHttpException = exception instanceof HttpException;
    const httpException = (() => exception as HttpException)();
    const errorResponse = httpException.getResponse
      ? (httpException.getResponse() as HttpErrorResponse)
      : (exception as HttpErrorResponse);

    const statusCode = isHttpException
      ? httpException.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = errorResponse.message || `unknown error in ${request.url}`;
    let errno = errorResponse.errno || HttpErrorCode.ERROR;
    let { error } = errorResponse;

    // 数据库错误
    if (errorResponse.sqlMessage) {
      message = 'DB Error';
      error = errorResponse.sqlMessage;
      errno = HttpErrorCode.DB_OPERATE_ERROR;
    }

    response.status(statusCode).json({
      errno,
      error,
      message,
    });
  }
}
