/* eslint-disable @typescript-eslint/no-explicit-any */

import createDebug from 'debug';
import { Got } from 'got';

import FlinksError from '../lib/flinks-error';
import { FlinksLoginResponse, LoginResponse, FlinksResponseBase, ResponseBase } from '../types';
import { transformOptions, transformResponse } from '../lib/transform-keys';

interface FlinksAuthorizeOptions {
  Institution?: string;
  Username?: string;
  Password?: string;
  Save: boolean;
  MostRecentCached: boolean;
  LoginId: string;
  SecurityResponses?: Record<string, any>;
  Tag?: string;
}

export interface AuthorizeOptions {
  institution?: string;
  username?: string;
  password?: string;
  save?: boolean;
  mostRecentCached?: boolean;
  loginId: string;
  securityResponses?: Record<string, any>;
  tag?: string;
}

export interface FlinksAuthorizeResponse extends FlinksResponseBase {
  RequestId: string;
  Login: FlinksLoginResponse;
}

export interface AuthorizeResponse extends ResponseBase {
  requestId: string;
  login: LoginResponse;
}

const debug = createDebug('node-flinks:commands:authorize');

const defaultOptions = {
  mostRecentCached: true,
  save: false
};

const authorize = async (client: Got, options: AuthorizeOptions): Promise<AuthorizeResponse> => {
  const requestOptions = transformOptions<AuthorizeOptions, FlinksAuthorizeOptions>({ ...defaultOptions, ...options });

  debug('request options', requestOptions);

  try {
    const response = await client.post<FlinksAuthorizeResponse>(`BankingServices/Authorize`, {
      json: {
        ...requestOptions
      },
      responseType: 'json'
    });

    debug('flinks authorize response', response.body);

    const data = response.body;

    return transformResponse<FlinksAuthorizeResponse, AuthorizeResponse>(data);
  } catch (error) {
    if (error.response?.body) {
      debug('flinks authorize error response', error.response.body);

      throw new FlinksError('authorize', { ...error.response.body });
    } else {
      debug('flinks authorize error', error);

      throw error;
    }
  }
};

export { authorize };
