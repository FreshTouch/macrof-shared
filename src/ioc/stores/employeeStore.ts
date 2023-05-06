import {Container, interfaces } from "inversify";

import {AFactoryStore} from "./factory/AFactoryStore";
import {CallBackProvider, CollectProvider, IocIEmployeeStore} from "../interfaces";
import {TEmployeeStores} from "..";

export class EmployeeStore extends AFactoryStore implements IocIEmployeeStore {

  protected readonly rootContainer: Container;

  private container: interfaces.Container;

  private initialStores: CallBackProvider[];

  private usedStores: Record<string, TEmployeeStores>;

  constructor(rootContainer: Container) {
    super();

    this.initialStores = [];
    this.usedStores = {};

    this.rootContainer = rootContainer;
    this.container = AFactoryStore.appContainerFactory(this.rootContainer);
  }

  private set callableFC (callback: CallBackProvider) {
    try {
      this.usedStores = {...this.usedStores, ...callback(this.container)};
    } catch (e) {
      console.error(e);
    }
  }

  private collect({provider, reBuild}: CollectProvider): void {
    if (reBuild) {
      Object.entries(this.initialStores)
        .forEach(([, callback]: [unknown, (CallBackProvider)]): void => { this.callableFC = callback });
    } else if (provider) {
      this.callableFC = provider;
    }
  }

  public inject(provider: CallBackProvider): void {
    this.initialStores.push(provider);
    this.collect({provider});
  }

  public reBuild(): void {
    this.usedStores = {};
    this.container = AFactoryStore.appContainerFactory(this.rootContainer);
    this.collect({reBuild: true});
  }

  public init(): Record<string, TEmployeeStores> {
    return this.usedStores;
  }
}
