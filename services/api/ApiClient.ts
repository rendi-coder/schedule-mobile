import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import config from '../../config/app';

export class ApiClient {
  private axios: AxiosInstance;

  private static instance: ApiClient;

  private constructor() {
    this.axios = axios.create({
      baseURL: config.apiOrigin,
    });
  }

  public static get Instance() {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  get<T>(requestUrl: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.get(requestUrl, requestConfig);
  }

  post<T, R>(
    requestUrl: string,
    payload: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.axios.post(requestUrl, payload, requestConfig);
  }

  put<T, R>(
    requestUrl: string,
    payload: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.axios.put(requestUrl, payload, requestConfig);
  }

  delete<T>(requestUrl: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete(requestUrl, requestConfig);
  }
}
