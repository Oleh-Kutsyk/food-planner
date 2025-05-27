import { VariantType } from 'notistack';

import { httpClient, THttpClientInternalRequestConfig } from './httpClient';
import { refreshTokenWithReSendLastRequest } from './refreshToken';
import { IHttpClientResponseError } from './requestErrorType';
import { devLoggerService } from '../devLogger';

const STATUS_CODE = {
  401: 401,
  403: 403,
  422: 422,
  500: 500,
};

interface IGetAuthRefreshTokenBE {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  tokenType: string;
}

const REQUEST_TIMEOUT = 10000; // 10s;

interface IConfig {
  getAccessToken: () => string | null;
  refreshToken: () => Promise<IGetAuthRefreshTokenBE | undefined> | void;
  getTokenType: () => string | void;
  createNotification: (message: string, variant?: VariantType) => string | void;
  logout: () => void;
}

const initFunc = () => {};

export class HttpClientConfig {
  constructor() {
    this._getAccessToken = () => '';
    this._refreshToken = initFunc;
    this._getTokenType = initFunc;
    this._logout = initFunc;
    this._createNotification = initFunc;
  }

  private _getAccessToken: IConfig['getAccessToken'];
  private _refreshToken: IConfig['refreshToken'];
  private _logout: IConfig['logout'];
  private _getTokenType: IConfig['getTokenType'];
  private _createNotification: IConfig['createNotification'];

  initialize(config: IConfig): void {
    this._getAccessToken = config.getAccessToken;
    this._refreshToken = config.refreshToken;
    this._logout = config.logout;
    this._getTokenType = config.getTokenType;
    this._createNotification = config.createNotification;
    this._setDefaults();
    this._setRequestInterceptors();
    this._setResponseInterceptors();
  }

  private get _authHeader() {
    const token = this._getAccessToken();
    const tokenType = this._getTokenType() || '';
    return token ? `${tokenType} ${token}` : '';
  }

  private _setDefaults() {
    httpClient.defaults = {
      timeout: REQUEST_TIMEOUT,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private _setRequestInterceptors() {
    httpClient.interceptors.request.use(
      (
        config: THttpClientInternalRequestConfig
      ): THttpClientInternalRequestConfig => {
        if (this._authHeader) {
          config.headers.Authorization = this._authHeader;
        }

        return config;
      },
      (error: Error): Error => {
        devLoggerService.error('Error in _setRequestInterceptors', { error });
        throw error;
      }
    );
  }

  private _setResponseInterceptors() {
    httpClient.interceptors.response.use(
      response => response,
      (error: IHttpClientResponseError) => {
        const response = error.response;

        if (error.code === 'ERR_CANCELED') {
          throw error as Error;
        }

        if (!response?.status) {
          return;
        }

        if (response.status === STATUS_CODE[401]) {
          const refresh = this._refreshToken as () => Promise<
            IGetAuthRefreshTokenBE | undefined
          >;
          return refreshTokenWithReSendLastRequest(
            response.config,
            refresh,
            this._logout
          );
        }
        console.log(error);
        if (error?.message) {
          this._createNotification(error?.message, 'error');
        }

        throw error as Error;
      }
    );
  }
}

export const httpClientConfig = new HttpClientConfig();
