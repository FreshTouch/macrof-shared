import {injectable} from 'inversify';

import {Common} from './common';
import {ILogger} from './interface';

@injectable()
export class Production extends Common implements ILogger {
  toError(): void {
    // прописать функционал
  };
}
