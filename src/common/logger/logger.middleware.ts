import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, query, body, originalUrl } = req;

    res.on('finish', () => {
      this.logger.log(
        `REQUEST ${method} ${originalUrl}: Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
      );
      this.logger.log(
        `RESPONSE ${method} ${originalUrl}: Status code: ${res.statusCode} | Status message: ${res.statusMessage}`,
      );
    });

    next();
  }
}
