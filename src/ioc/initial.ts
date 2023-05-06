import {
  CallBackProvider,
  initMFProviders,
  TInitProviders
} from "..";

export const InitProviders: ({providers}: TInitProviders) => () => void =
  ({providers}: TInitProviders): () => void => (): void =>
    initMFProviders(providers as CallBackProvider);
