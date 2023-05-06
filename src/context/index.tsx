import {Container} from "inversify";
import React, {Context as ReactContext, useContext} from 'react';

import {
    CallBackProvider,
    TAppContextCallBack,
    TAppContextElement,
    TAppContextProps,
    TUseMFContext,
    TEmployeeStores,
    TEmployeeContext,
    createAppStores,
    IocIEmployeeStore,
    IRootStore,
    TMfStoreCb,
    TStores,
    TAppStoreContext,
    ERR
} from "..";

export function Context <TContext>(store?: TContext): ReactContext<TContext | null> {
    return React.createContext<TContext| null>(store || null)
}

export const AppStore: () => TEmployeeStores =
    ((store: TEmployeeStores): () => TEmployeeStores => (): TEmployeeStores => store)(createAppStores());

export const _appStoreContext: () => TEmployeeContext =
    ((context:TEmployeeContext): () => TEmployeeContext =>
      (): TEmployeeContext => context)(Context<TEmployeeStores>(AppStore()));

export const AppProvider: TAppContextCallBack<TAppContextElement> =
    ((AppContext: TEmployeeContext, appStore: () => TEmployeeStores): TAppContextCallBack<JSX.Element> =>
        ({...props}: TAppContextProps): JSX.Element =>
          <AppContext.Provider value={ appStore() }>{props.children}</AppContext.Provider>
)(_appStoreContext(), AppStore);

export function useAppStoreContext(): TEmployeeStores {
    const stores = React.useContext<TEmployeeStores | null>(_appStoreContext());

    if (!stores) {
        throw new Error(ERR.BEFORE_INIT);
    }

    return stores;
}

export function useMfContext(): TUseMFContext {
    const context: TEmployeeStores = useAppStoreContext();
    return { ...context.employeeStore.init(), ...context.rootStore.init() } as TUseMFContext;
}

export const useEmpStoreContext:() => IocIEmployeeStore =
    (): IocIEmployeeStore => useAppStoreContext().employeeStore;

export const useRootStoreContext: () => IRootStore =
    (): IRootStore => useAppStoreContext().rootStore

export const initMFProviders: (provider: CallBackProvider) => void =
    (provider: CallBackProvider): void => AppStore().employeeStore.inject(provider);

export function configureContextStore<T>(mfStoreCb: TMfStoreCb<T>): TStores<T> {
    const generalContextStore: TAppStoreContext =
        AppStore().rootStore as TAppStoreContext;

    if (!generalContextStore?.rootContainer) {
        console.error(ERR.CONTEXT);
    }

    const container: Container = new Container({
        defaultScope: 'Singleton',
        autoBindInjectable: true
    });

    container.parent = generalContextStore.rootContainer;

    return {
        ...generalContextStore.init(),
        ...mfStoreCb(container)
    };
}

export function useConfiguredStores<T>(configuredContext: ReactContext<TStores<T> | null>): TStores<T> {
    const context = useContext(configuredContext);

    if (!context) {
        console.error(ERR.BEFORE_INIT);
    }

    return context as TStores<T>;
}
