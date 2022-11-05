import { createWriteStream } from 'node:fs';
import * as path from 'node:path';

const enum LogLevel {
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

  static error(module: string, messsage: string, extra = '') {
    Log.#write(LogLevel.error, module, messsage, extra);
  }

  static info(module: string, messsage: string, extra = '') {
    Log.#write(LogLevel.info, module, messsage, extra);
  }

  static warn(module: string, messsage: string, extra = '') {
    Log.#write(LogLevel.warn, module, messsage, extra);
  }

  static debug(module: string, messsage: string, extra = '') {
    Log.#write(LogLevel.debug, module, messsage, extra);
  }

  // format `2022-11-05T00:04:12.984Z [http:info] 127.0.0.1 user-identifier "GET /apache_pb.gif HTTP/1.0" 200 2326`
  static #write(level: LogLevel, module: string, message: string, extra = '') {
    if (level <= Log.#options.level) {
      const date = new Date().toISOString();
      const extraMessage = extra.length > 0 ? ` ${extra}` : '';
      const log = `${date} [${module}:${level}] ${message}${extraMessage}\n`;

      if (Log.#options.file) {
        const file = Log.#file();

        file.write(log, 'utf8');
        // @TODO endup by checking messag size
        file.end();
      }

      if (Log.#options.stdout) {
        console.log(log);
      }
    }
  }
}
