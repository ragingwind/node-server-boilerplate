import { createWriteStream } from 'node:fs';
import * as path from 'node:path';

export const enum LogLevel {
  'error' = 0,
  'info' = 1,
  'warn' = 2,
  'debug' = 3,
}

export type LogOptions = {
  level: LogLevel;
  file?: string;
  stdout?: boolean;
};

export class Log {
  static #options: LogOptions = {
    level: LogLevel.debug,
    file: 'server.log',
    stdout: true,
  };

  static #stream: any;

  static #file() {
    if (Log.#options.file) {
      Log.#stream = createWriteStream(path.resolve(Log.#options.file), {
        flags: 'a',
      });
    }
    return Log.#stream;
  }

  static set(options: LogOptions) {
    Log.#options = { ...Log.#options, ...options };

    if (Log.#stream) {
      Log.#stream.end();
      Log.#stream.close();
    }
  }

  static error(module: string, ...args: any[]) {
    Log.#write(LogLevel.error, module, ...args);
  }

  static info(module: string, ...args: any[]) {
    Log.#write(LogLevel.info, module, ...args);
  }

  static warn(module: string, ...args: any[]) {
    Log.#write(LogLevel.warn, module, ...args);
  }

  static debug(module: string, ...args: any[]) {
    Log.#write(LogLevel.debug, module, ...args);
  }

  // format `2022-11-05T00:04:12.984Z [http:info] 127.0.0.1 user-identifier "GET /apache_pb.gif HTTP/1.0" 200 2326`
  static #write(...args: any[]) {
    const [level, module, ...message] = args;
    if (level <= Log.#options.level) {
      const date = new Date().toISOString();
      const log = `${date} [${module}:${level}] ${message
        .map((m) => JSON.stringify(m))
        .join(' ')}`;
      if (Log.#options.file) {
        const file = Log.#file();
        file.write(log + '\n', 'utf8');
        file.end();
      }
      if (Log.#options.stdout) {
        console.log(log);
      }
    }
  }
}
