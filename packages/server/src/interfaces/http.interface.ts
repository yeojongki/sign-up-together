import { User } from '@/modules/user/user.entity';
import { Request } from 'express';

export interface HttpBaseResponse {
  errno: number;
  message: string;
}

export interface HttpErrorResponse extends HttpBaseResponse {
  error?: any;
  sqlMessage?: string;
  parameters?: string[];
  name?: string;
}

export interface HttpSuccessResponse<T = any> extends HttpBaseResponse {
  result: T;
}

export type HttpResonse<T = any> = HttpErrorResponse | HttpSuccessResponse<T>;

export type RequestWithAuth = Request & { user: User };
