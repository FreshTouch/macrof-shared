import {Container} from "inversify";

import {FactoryStore} from "./factory/FactoryStore";
import {RootStore} from "./rootStore";
import {EmployeeStore} from "./employeeStore";
import {ContainerInit} from "../interfaces";

export class Store extends FactoryStore {

  protected readonly rootContainer: Container;

  constructor() {
    super();

    this.rootContainer = this.rootContainerFactory();
  }

  public init(): ContainerInit {
    return {
      rootStore: new RootStore(this.rootContainer),
      employeeStore: new EmployeeStore(this.rootContainer)
    }
  }
}
