import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage =
      typeof message === 'object' && message !== null && 'message' in message
        ? (message as { message: string | string[] }).message
        : String(message);

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(errorMessage)}`,
    );

    response.status(status).json({
      success: false,
      data: null,
      message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
    });
  }
}
