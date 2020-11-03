import createDebug from 'debug';
import { Got } from 'got';

import FlinksError from '../lib/flinks-error';
import {
  FlinksResponseBase,
  FlinksAccountResponse,
  FlinksLoginResponse,
  ResponseBase,
  AccountResponse,
  LoginResponse
} from '../types';
import { transformOptions, transformResponse } from '../lib/transform-keys';

interface FlinksGetAccountsDetailOptions {
  requestId: string;
  MostRecentCached?: boolean;
  WithAccountIdentity?: boolean;
  WithKYC?: boolean;
  WithTransactions?: boolean;
  WithBalance?: boolean;
  AccountsFilter?: string[];
  DaysOfTransactions?: string;
}

export interface GetAccountsDetailOptions {
  requestId: string;
  mostRecentCached?: boolean;
  withAccountIdentity?: boolean;
  withKYC?: boolean;
  withTransactions?: boolean;
  withBalance?: boolean;
  accountsFilter?: string[];
  daysOfTransactions?: string;
}

export interface GetAccountsDetailAsyncOptions {
  requestId: string;
}

export interface FlinksGetAccountsDetailResponse extends FlinksResponseBase {
  Accounts: FlinksAccountResponse[];
  Login: FlinksLoginResponse;
  Institution: string;
  RequestId: string;
}

export interface FlinksGetAccountsDetailAsyncResponse extends FlinksResponseBase {
  FlinksCode: string;
  Message: string;
  RequestId: string;
}

export interface GetAccountsDetailResponse extends ResponseBase {
  accounts: AccountResponse[];
  login: LoginResponse;
  institution: string;
  requestId: string;
}

export interface GetAccountsDetailAsyncResponse extends ResponseBase {
  flinksCode: string;
  message: string;
  requestId: string;
}

const debug = createDebug('node-flinks:commands:accounts');

const defaultOptions = {
  mostRecentCached: true
};

const isResponse = (
  data: FlinksGetAccountsDetailResponse | FlinksGetAccountsDetailAsyncResponse
): data is FlinksGetAccountsDetailResponse => {
  return data.HttpStatusCode === 200;
};

const isAsyncResponse = (
  data: FlinksGetAccountsDetailResponse | FlinksGetAccountsDetailAsyncResponse
): data is FlinksGetAccountsDetailResponse => {
  return data.HttpStatusCode === 202;
};

const getAccountsDetail = async (
  client: Got,
  options: GetAccountsDetailOptions
): Promise<GetAccountsDetailResponse | GetAccountsDetailAsyncResponse> => {
  const requestOptions = transformOptions<GetAccountsDetailOptions, FlinksGetAccountsDetailOptions>({
    ...defaultOptions,
    ...options
  });

  debug('request options', requestOptions);

  try {
    const response = await client.post<FlinksGetAccountsDetailResponse | FlinksGetAccountsDetailAsyncResponse>(
      `BankingServices/GetAccountsDetail`,
      {
        json: {
          ...requestOptions
        },
        responseType: 'json'
      }
    );

    debug('flinks getAccountsDetail response', response.body);

    const data = response.body;

    if (isResponse(data)) {
      return transformResponse<FlinksGetAccountsDetailResponse, GetAccountsDetailResponse>(data);
    } else if (isAsyncResponse(data)) {
      return transformResponse<FlinksGetAccountsDetailAsyncResponse, GetAccountsDetailAsyncResponse>(data);
    } else {
      throw new Error(`Unexpected response code from getAccountsDetail: ${data.HttpStatusCode}`);
    }
  } catch (error) {
    if (error.response?.body) {
      debug('flinks getAccountsDetail error response', error.response.body);

      throw new FlinksError('getAccountsDetail', { ...error.response.body });
    } else {
      debug('flinks getAccountsDetail error', error);

      throw error;
    }
  }
};

const getAccountsDetailAsync = async (
  client: Got,
  options: GetAccountsDetailAsyncOptions
): Promise<GetAccountsDetailResponse | GetAccountsDetailAsyncResponse> => {
  try {
    const response = await client.post<FlinksGetAccountsDetailResponse | FlinksGetAccountsDetailAsyncResponse>(
      `BankingServices/GetAccountsDetailAsync/${options.requestId}`,
      {
        responseType: 'json'
      }
    );

    debug('flinks getAccountsDetailAsync response', response.body);

    const data = response.body;

    if (isResponse(data)) {
      return transformResponse<FlinksGetAccountsDetailResponse, GetAccountsDetailResponse>(data);
    } else if (isAsyncResponse(data)) {
      return transformResponse<FlinksGetAccountsDetailAsyncResponse, GetAccountsDetailAsyncResponse>(data);
    } else {
      throw new Error(`Unexpected response code from getAccountsDetailAsync: ${data.HttpStatusCode}`);
    }
  } catch (error) {
    if (error.response?.body) {
      debug('flinks getAccountsDetailAsync error response', error.response.body);

      throw new FlinksError('getAccountsDetailAsync', { ...error.response.body });
    } else {
      debug('flinks getAccountsDetailAsync error', error);

      throw error;
    }
  }
};

export { getAccountsDetail, getAccountsDetailAsync };
