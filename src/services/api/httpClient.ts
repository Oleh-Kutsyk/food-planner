import Axios, {
  AxiosInstance,
  AxiosResponse,
  CancelToken,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

export type THttpClientInstance = AxiosInstance;
export type THttpClientResponse<T> = AxiosResponse<T>;

export type THttpClientRequestConfig = AxiosRequestConfig;
export type THttpClientInternalRequestConfig = InternalAxiosRequestConfig;

export const httpClient: THttpClientInstance = Axios.create({
  baseURL: process.env.BASE_URL,
  headers: {},
});

export const isHttpClientCancel = Axios.isCancel;

export const httpClientCancelTokenStatic = Axios.CancelToken;
export type THttpClientCancelToken = CancelToken;

export type TAsyncActionOptions = {
  cancelToken: {
    cancelToken?: THttpClientCancelToken;
  };
};
