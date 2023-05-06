import {Container, interfaces} from "inversify";

import {ContainerInit, IAFactoryStore, RootInit} from "../../interfaces";
import {TEmployeeStores} from "../../createStores";

export abstract class AFactoryStore implements IAFactoryStore<Record<string, TEmployeeStores> | RootInit | ContainerInit> {
  protected abstract rootContainer: interfaces.Container;

  protected static appContainerFactory(parentContainer: Container): Container | interfaces.Container {
    const container: Container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });
    container.parent = parentContainer;
    return container;
  };

  public abstract init(): Record<string, TEmployeeStores> | RootInit | ContainerInit;
}
