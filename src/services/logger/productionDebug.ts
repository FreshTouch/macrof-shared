import {injectable} from 'inversify';

import {Common} from './common';
import {ILogger} from "../..";

@injectable()
export class ProductionDebug extends Common implements ILogger {
  public toError(description: string, title: string, ...args: any[]): void {
    console.group(title);
    console.error(description);

    if (args.length > 0) {
      args.forEach(x => console.info(x));
    }

    console.groupEnd();
  };
}
