import {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestConfig} from 'axios';

export type TAxiosUrlParams = { urlParams?: { [key: string]: string | number } };
export type TAxiosMethodsParams = RawAxiosRequestConfig & TAxiosUrlParams;
export type TCustomAxiosRequestConfig = AxiosRequestConfig & TAxiosUrlParams;
export type TRequestInternalAxios = AxiosRequestConfig | InternalAxiosRequestConfig | any;

export interface IServerErrorResponseData {
  error: string;
  reason: string;
  message: string;
  status: number;
  timestamp: string;
}

export interface IHttpService {
  get<T>(url: string, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;
  post<T>(url: string, data: Record<string, any>, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;
  postFormData<T>(
    url: string,
    data: Record<string, any>,
    params?: TAxiosMethodsParams,
  ): Promise<AxiosResponse<T>>;
  put<T>(url: string, data: Record<string, any>, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;
  delete<T>(url: string, params?: TAxiosMethodsParams): Promise<AxiosResponse<T>>;
}
