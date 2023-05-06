import { interfaces, Container } from 'inversify';

import { IHttpService, ILogger, Response, ILoader, MF_TYPES } from '../..';
import { AFactoryStore } from './factory/AFactoryStore';
import { IRootStore, RootInit } from '../interfaces';

export class RootStore extends AFactoryStore implements IRootStore {
  protected readonly rootContainer: interfaces.Container;

  public logger: ILogger;

  public http: IHttpService;

  public process: Response;

  public loader: ILoader;

  constructor(rootContainer: Container) {
    super();

    this.rootContainer = rootContainer;

    this.logger = this.rootContainer.get<ILogger>(MF_TYPES.ILogger);
    this.http = this.rootContainer.get<IHttpService>(MF_TYPES.IHttpService);
    this.process = this.rootContainer.get<Response>(MF_TYPES.IResponseService);
    this.loader = this.rootContainer.get<ILoader>(MF_TYPES.ILoader);
  }

  public init(): RootInit {
    return {
      logger: this.logger,
      http: this.http,
      process: this.process,
      loader: this.loader,
    };
  }
}
