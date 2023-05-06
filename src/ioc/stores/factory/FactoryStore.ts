import { Container, interfaces } from 'inversify';

import {
  Common,
  Service,
  IHttpService,
  ILogger,
  IResponseService,
  ProductionDebug,
  Production,
  Response,
  Token,
  ILoader,
  LoaderService,
  IS_DEV,
  MF_TYPES,
} from '../../..';
import { AFactoryStore } from './AFactoryStore';

export abstract class FactoryStore extends AFactoryStore {
  protected rootContainerFactory = (): Container => {
    const container: Container = this.createParentDev();
    container.parent = new Container();
    return container;
  };

  private createParentDev(): Container {
    const container: Container = new Container();

    if (IS_DEV) {
      container.bind<ILogger>(MF_TYPES.ILogger).to(Common);
    } else {
      const { location } = window as Window;
      const isDebugMode = Boolean(new URLSearchParams(location.search).get('DEBUG'));

      container
        .bind<ILogger>(MF_TYPES.ILogger)
        .to(Production)
        .when(() => !isDebugMode);
      container
        .bind<ILogger>(MF_TYPES.ILogger)
        .to(ProductionDebug)
        .when(() => isDebugMode);
    }

    container.bind<IResponseService>(MF_TYPES.IResponseService).to(Response);
    container.bind<Token>(MF_TYPES.Token).toConstantValue(new Token());
    container.bind<ILoader>(MF_TYPES.ILoader).to(LoaderService).inSingletonScope();

    container
      .bind<IHttpService>(MF_TYPES.IHttpService)
      .toDynamicValue(
        (context: interfaces.Context) =>
          new Service(context.container.get<ILogger>(MF_TYPES.ILogger), context.container.get<Token>(MF_TYPES.Token))
      )
      .inSingletonScope();

    return container;
  }
}
