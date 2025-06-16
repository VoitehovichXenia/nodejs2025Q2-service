import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const contentTypeHeader = request.headers['content-type'];

    if (!contentTypeHeader) {
      throw new BadRequestException('Missing required header: Content-Type');
    }
    if (contentTypeHeader !== 'application/json') {
      throw new BadRequestException(
        'Content-Type header must be equal to application/json',
      );
    }

    return true;
  }
}
