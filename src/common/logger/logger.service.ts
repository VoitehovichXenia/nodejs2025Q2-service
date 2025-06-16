import {
  Injectable,
  LoggerService as CoreLoggerService,
  LOG_LEVELS,
} from '@nestjs/common';
import { LOG_PREFIXES, LogColors } from './logger.const';
import { mkdir } from 'node:fs/promises';
import { Writable } from 'node:stream';
import { join } from 'node:path';
import { createStream } from 'rotating-file-stream';

@Injectable()
export class LoggerService implements CoreLoggerService {
  private _ws: Writable;
  private _priority: number;

  constructor() {
    let logLevel = parseInt(process.env.LOG_LEVEL);
    if (isNaN(logLevel)) {
      logLevel = 3;
    }
    this._priority = logLevel;

    const logsDir = join(process.cwd(), 'logs');
    mkdir(logsDir, { recursive: true }).then(() => {
      const size = process.env.LOG_FILE_SIZE_KB || '100';
      this._ws = createStream('app.log', {
        size: `${size}K`,
        interval: '1d',
        path: logsDir,
        compress: 'gzip',
      });
    });
  }

  private _formatOutput(color: LogColors, text: string) {
    return `${LOG_PREFIXES[color]}${text}${LOG_PREFIXES.reset}`;
  }

  private _write(message: string, color: LogColors) {
    const date = new Date();
    const formatted = this._formatOutput(
      color,
      `[Home library ${date.toLocaleDateString()} ${date.toLocaleTimeString()}] ${message}`,
    );
    process.stdout.write(`${formatted}\n`);
    this._ws.write(`${formatted}\n`);
  }

  customLog(message: string, color: LogColors) {
    if (this._priority >= LOG_LEVELS.indexOf('log')) {
      this._write(`LOG: ${message}`, color);
    }
  }

  log(message: string) {
    if (this._priority >= LOG_LEVELS.indexOf('log')) {
      this._write(`LOG: ${message}`, 'blue');
    }
  }

  error(message: string, trace?: string) {
    this._write(`ERROR: ${message}${trace ? `\n${trace}` : ''}`, 'red');
  }

  fatal(message: string) {
    this._write(`FATAL: ${message}`, 'red');
  }

  warn(message: string) {
    if (this._priority >= LOG_LEVELS.indexOf('warn')) {
      this._write(`WARN: ${message}`, 'yellow');
    }
  }

  debug(message: string) {
    if (this._priority >= LOG_LEVELS.indexOf('debug')) {
      this._write(`DEBUG: ${message}`, 'green');
    }
  }

  verbose(message: string) {
    if (this._priority >= LOG_LEVELS.indexOf('verbose')) {
      this._write(`VERBOSE: ${message}`, 'blue');
    }
  }
}
