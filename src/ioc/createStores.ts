import {Context as ReactContext} from "react";

import {Store} from "./stores";

export const _createAppStores = () => ({...new Store().init()});

export type TEmployeeStores = ReturnType<typeof _createAppStores>;

export const createAppStores: () => TEmployeeStores = _createAppStores;

export type TEmployeeContext = ReactContext<TEmployeeStores | null>;
