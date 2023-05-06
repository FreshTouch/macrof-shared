import { createBrowserHistory } from 'history';
import type { History } from 'history';
import { observable } from 'mobx';

import { includedPath } from '../utils';

export type TMFHistory = History & { navigate: (key: string, isDefault?: boolean) => void };

const lastHashed = observable.object({ key: '' });

export const mfHistory = ((history: TMFHistory): (() => TMFHistory) => (): TMFHistory => {
  // eslint-disable-next-line no-param-reassign
  history.navigate = function navigate(key: string, isDefault?: boolean) {
    if (isDefault || (key !== lastHashed.key && !includedPath(key, this.location.pathname))) {
      lastHashed.key = key;
      this.push(key);
    }
  };

  return history;
})(createBrowserHistory(window) as TMFHistory);
