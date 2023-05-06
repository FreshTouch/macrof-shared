export type Console = 'info' | 'log' | 'warn' | 'error';

export interface ILogger {
  toConsole(type: Console, value: any): void;
  toConsoleGroup(type: Console, description: string, title: any, ...args: any[]): void;
  toNotify(type: Console, description: string, title: string): void;
  toMessage(type: Console, description: string): void;
  toError(description: string, title: string, ...args: any[]): void;
}
