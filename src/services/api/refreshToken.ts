import axios, { AxiosRequestConfig } from 'axios';
import { devLoggerService } from '@/services/devLogger';
import { IHttpClientResponseError } from '@/services/api/requestErrorType';

interface IGetAuthRefreshTokenBE {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  tokenType: string;
}

type TRefreshSubscribers = (token: string, tokenType: string) => void;

const oneSecond = 1000;
let isTokenRefreshing = false;
let refreshSubscribers: TRefreshSubscribers[] = [];

/*
 * Callback when token refreshed
 * @param token
 */
const onRefreshed = (token: string, tokenType: string) => {
  refreshSubscribers.map(callback => callback(token, tokenType));
};

/*
 * Collect 401 requests
 * @param callback
 */
const subscribeTokenRefresh = (callback: TRefreshSubscribers) => {
  refreshSubscribers.push(callback);
};

export const refreshTokenWithReSendLastRequest = (
  originalRequest: AxiosRequestConfig,
  refreshToken: () => Promise<IGetAuthRefreshTokenBE | undefined>,
  logout: () => void
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (!isTokenRefreshing) {
      isTokenRefreshing = true;
      refreshToken()
        .then(response => {
          if (!response) {
            throw new Error('Refresh token call in not update access token');
          }
          isTokenRefreshing = false;
          onRefreshed(response.idToken, response.tokenType);
          setTimeout(() => {
            refreshSubscribers = [];
          }, oneSecond);
        })
        .catch((error: IHttpClientResponseError) => {
          devLoggerService.error('refreshTokenError', error);
          logout();
          reject(error as Error);
        });
    }

    subscribeTokenRefresh((idToken: string, tokenType: string) => {
      // Replace the expired idToken and retry
      originalRequest.headers = {
        Authorization: `${tokenType} ${idToken}`,
      };
      axios(originalRequest).then(
        response => resolve(response),
        (error: IHttpClientResponseError) => reject(error as Error)
      );
    });
  });
};
