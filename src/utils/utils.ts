import {AxiosError, AxiosResponse} from 'axios';

export const isAxiosResponse = (response: any): response is AxiosResponse => 'data' in response;
export const isAxiosError = (error: any): error is AxiosError => 'isAxiosError' in error && 'response' in error;

export function _env(name: string): string | undefined {
  return process.env[`REACT_APP_${name}`] || process.env[name];
}
