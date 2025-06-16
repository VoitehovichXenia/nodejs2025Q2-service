import {
  Injectable,
  LoggerService as CoreLoggerService,
  LogLevel,
  LOG_LEVELS,
} from '@nestjs/common';
import { LOG_PREFIXES, LogColors } from './logger.const';

@Injectable()
export class LoggerService implements CoreLoggerService {
  private level: LogLevel;
  private priority: number;

  constructor() {
    const logLevel = process.env.LOG_LEVEL || 'log';
    const priorityIndex = LOG_LEVELS.indexOf(logLevel as LogLevel);
    this.level = logLevel as LogLevel;
    this.priority = priorityIndex;
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
  }

  log(message: string) {
    if (this.priority >= LOG_LEVELS.indexOf('log')) {
      this._write(`LOG: ${message}`, 'blue');
    }
  }

  error(message: string) {
    this._write(`ERROR: ${message}`, 'red');
  }

  fatal(message: string) {
    this._write(`FATAL: ${message}`, 'red');
  }

  warn(message: string) {
    if (this.priority >= LOG_LEVELS.indexOf('warn')) {
      this._write(`WARN: ${message}`, 'yellow');
    }
  }

  debug(message: string) {
    if (this.priority >= LOG_LEVELS.indexOf('debug')) {
      this._write(`DEBUG: ${message}`, 'green');
    }
  }

  verbose(message: string) {
    if (this.priority >= LOG_LEVELS.indexOf('verbose')) {
      this._write(`VERBOSE: ${message}`, 'blue');
    }
  }
}
