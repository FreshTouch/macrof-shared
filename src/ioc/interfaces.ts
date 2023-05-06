import { ReactNode, ReactElement, JSXElementConstructor } from 'react';
import { interfaces } from 'inversify';

import { TEmployeeStores } from './createStores';
import { ILogger, IHttpService, Response, ILoader } from '..';

export type Provider = Record<string, TEmployeeStores>;
export type CallBackProvider = (container: interfaces.Container) => Provider;

export type TInitProviders = {
  providers: CallBackProvider;
};

export type CollectProvider = {
  provider?: CallBackProvider;
  reBuild?: boolean;
};

export type RootInit = {
  logger: ILogger;
  http: IHttpService;
  process: Response;
  loader: ILoader;
};

export type TUseMFContext = Record<string, TEmployeeStores> & RootInit;

export interface IAFactoryStore<T> {
  init(): T;
}

export type IRootStore = IAFactoryStore<RootInit>;

export interface IocIEmployeeStore extends IAFactoryStore<Record<string, TEmployeeStores>> {
  reBuild(): void;
  inject(provider: CallBackProvider): void;
}

export type ContainerInit = {
  rootStore: IRootStore;
  employeeStore: IocIEmployeeStore;
};

export type TAppContextProps = { children?: ReactNode | undefined };
export type TAppContextElement = ReactElement<any, string | JSXElementConstructor<any>> | null;
export type TAppContextCallBack<T> = (props: TAppContextProps) => T;
export type TContainer = interfaces.Container;
export type TStores<T> = T & RootInit;
export type TAppStoreContext = IRootStore & { rootContainer: TContainer };
export type TMfStoreCb<T> = (container: TContainer) => T;
