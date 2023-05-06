import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Middleware, TAxiosMethodsParams } from "..";
import { Final } from "../..";

export class Service extends Middleware {
  @Final
  public get<T>(url: string, params: TAxiosMethodsParams = {}): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, params);
  }

  @Final
  public post<T = any>(
    url: string,
    data: object = {},
    params: TAxiosMethodsParams = {},
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, params);
  }

  @Final
  public postFormData<T = any>(
    url: string,
    data: object = {},
    params: TAxiosMethodsParams = {},
  ): Promise<AxiosResponse<T>> {
    const headers = Object.create(params.headers || {});

    if (!(params.headers && 'Content-Type' in params.headers)) {
      headers['Content-Type'] = 'multipart/form-data; boundary="boundary"';
    }

    const paramsFormData: AxiosRequestConfig = {
      ...params,
      headers,
    };

    return this.client.post<T>(url, data, paramsFormData);
  }

  @Final
  public put<T = any>(
    url: string,
    data: object = {},
    params: TAxiosMethodsParams = {},
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, params);
  }

  @Final
  public delete<T = any>(url: string, params: TAxiosMethodsParams = {}): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, params);
  }
}
