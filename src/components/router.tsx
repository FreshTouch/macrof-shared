import React, { ReactNode } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Update } from 'history';
import { Router } from 'react-router-dom';
import type { Action, Location } from 'history';

import { mfHistory } from '..';

export interface IRouterState {
  action: Action;
  location: Location;
  canListen: boolean;
}

export interface IProps {
  basename?: string;
  children?: ReactNode;
}

const history = mfHistory();

const RouterState: IRouterState = observable.object({
  action: history.action,
  location: history.location,
  canListen: true,
});

history.listen((update: Update): void => {
  RouterState.action = update.action;
  RouterState.location = update.location;
});

export const MainRouter = observer(
  ({ ...props }: IProps): JSX.Element => {
    return (
      <Router
        basename={props.basename}
        location={RouterState.location}
        navigationType={RouterState.action}
        navigator={history}
      >
        {props.children}
      </Router>
    );
  }
);
