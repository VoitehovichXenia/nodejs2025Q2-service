export const LOG_PREFIXES = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  purple: '\x1b[35m',
  reset: '\x1b[0m',
} as const;

export const LOG_LEVELS = ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'];

export type LogColors = keyof typeof LOG_PREFIXES;
