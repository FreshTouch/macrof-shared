import { inject, injectable } from "inversify";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import {
  ILogger,
  TCustomAxiosRequestConfig,
  IHttpService,
  IServerErrorResponseData,
  isAxiosError,
  MF_TYPES,
  Token,
  TAxiosMethodsParams, TRequestInternalAxios,
} from "../..";

@injectable()
export abstract class Middleware implements IHttpService {
  private readonly _promise: PromiseConstructor;

  protected readonly client: AxiosInstance;

  constructor(@inject(MF_TYPES.ILogger) private _logger: ILogger, @inject(MF_TYPES.Token) private _token: Token) {
    this._promise = Promise;
    this.client = axios.create({ baseURL: "/api", timeout: 10000 });

    this.client.interceptors.request.use(this.requestMiddleware.bind(this));
    this.client.interceptors.response.use(this.responseMiddleware.bind(this), this.errorMiddleware.bind(this));
  }

  private requestMiddleware(config: TCustomAxiosRequestConfig): TRequestInternalAxios {
    if (!config.url) {
      return config;
    }

    let pathname = config.url;

    Object.entries(config.urlParams || {}).forEach(([k, v]) => {
      pathname = pathname.replace(`:${k}`, encodeURIComponent(v));
    });

    const headers = Object.create(config.headers || {});
    headers.Authorization = config.headers?.Authorization ?? `Bearer ${this._token.token}`;

    return {
      ...config,
      url: pathname,
      headers,
    };
  }

  private responseMiddleware(response: AxiosResponse): Promise<AxiosResponse> {
    return this._promise.resolve(response);
  }

  private errorMiddleware(error: Error | AxiosError<IServerErrorResponseData>): any {
    if (isAxiosError(error) && error.isAxiosError) {
      if (error.response?.status === 408) {
        this._logger.toError(error.config?.url ?? "", "Timeout exceeded");
      } else if (error.response?.status === 401) {
        this._token.expired = true;
      }
    } else {
      this._logger.toNotify("error", "Unknown error", "Unknown");
    }

    return this._promise.reject(error);
  }

  public abstract get<T>(url: string, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;

  public abstract post<T>(
    url: string,
    data: Record<string, any>,
    params?: TAxiosMethodsParams
  ): Promise<AxiosResponse<T>>;

  public abstract postFormData<T>(
    url: string,
    data: Record<string, any>,
    params?: TAxiosMethodsParams
  ): Promise<AxiosResponse<T>>;

  public abstract put<T>(
    url: string,
    data: Record<string, any>,
    params?: TAxiosMethodsParams
  ): Promise<AxiosResponse<T>>;

  public abstract delete<T>(url: string, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;
}
