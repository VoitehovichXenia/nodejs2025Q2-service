import { Injectable, LoggerService as CoreLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements CoreLoggerService {
  private _write(message: string) {
    const formatted = `[Custom Logger ${new Date().toISOString()}] ${message}`;
    process.stdout.write(`${formatted}\n`);
  }

  log(message: string) {
    this._write(`LOG: ${message}`);
  }

  error(message: string) {
    this._write(`ERROR: ${message}`);
  }

  warn(message: string) {
    this._write(`WARN: ${message}`);
  }
}
