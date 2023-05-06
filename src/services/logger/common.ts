import {injectable} from 'inversify';

import {Console, ILogger} from '../..';

@injectable()
export class Common implements ILogger {
  public toConsole(type: Console, value: unknown): void {
    console[type](value);
  }

  public toConsoleGroup(type: Console, description: string, title: string, ...args: any[]): void {
    console.group(title);
    console[type](description);
    if (args.length > 0) {
      args.forEach(x => console.info(x));
    }
    console.groupEnd();
  }

  public toNotify(type: Console, description: string, title: string): void {

    const logToConsole = description.length > 100;

    if (logToConsole) {
      this.toConsoleGroup(type, description, title);
    }
  }

  public toMessage(type: Console, description: string): void {
    console[type](description);
  }

  public toError(description: string, title: string, ...args: any[]): void {
    this.toConsoleGroup('error', description, title, ...args);
  }
}
