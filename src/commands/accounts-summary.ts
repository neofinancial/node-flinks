import createDebug from 'debug';
import { Got } from 'got';

import {
  FlinksResponseBase,
  FlinksSummaryAccountResponse,
  FlinksLoginResponse,
  ResponseBase,
  AccountResponse,
  LoginResponse
} from '../types';
import { transformOptions, transformResponse } from '../lib/transform-keys';

interface FlinksGetAccountsSummaryOptions {
  requestId: string;
  WithBalance?: boolean;
}

export interface GetAccountsSummaryOptions {
  requestId: string;
  withBalance?: boolean;
}

export interface FlinksGetAccountsSummaryResponse extends FlinksResponseBase {
  Accounts: FlinksSummaryAccountResponse[];
  Login: FlinksLoginResponse;
  Institution: string;
  RequestId: string;
}

export interface FlinksGetAccountsSummaryAsyncResponse extends FlinksResponseBase {
  FlinksCode: string;
  Message: string;
  RequestId: string;
}

export interface GetAccountsSummaryResponse extends ResponseBase {
  accounts: AccountResponse[];
  login: LoginResponse;
  institution: string;
  requestId: string;
}

export interface GetAccountsSummaryAsyncResponse extends ResponseBase {
  flinksCode: string;
  message: string;
  requestId: string;
}

const debug = createDebug('node-flinks:commands:accounts');

const defaultOptions = {
  mostRecentCached: true
};

const isResponse = (
  data: FlinksGetAccountsSummaryResponse | FlinksGetAccountsSummaryAsyncResponse
): data is FlinksGetAccountsSummaryResponse => {
  return data.HttpStatusCode === 200;
};

const isAsyncResponse = (
  data: FlinksGetAccountsSummaryResponse | FlinksGetAccountsSummaryAsyncResponse
): data is FlinksGetAccountsSummaryResponse => {
  return data.HttpStatusCode === 202;
};

const getAccountsSummary = async (
  client: Got,
  options: GetAccountsSummaryOptions
): Promise<GetAccountsSummaryResponse | GetAccountsSummaryAsyncResponse> => {
  const requestOptions = transformOptions<GetAccountsSummaryOptions, FlinksGetAccountsSummaryOptions>({
    ...defaultOptions,
    ...options
  });

  debug('request options', requestOptions);

  try {
    const response = await client.post<FlinksGetAccountsSummaryResponse | FlinksGetAccountsSummaryAsyncResponse>(
      `BankingServices/GetAccountsSummary`,
      {
        json: {
          ...requestOptions
        },
        responseType: 'json'
      }
    );

    debug('flinks getAccountsSummary response', response.body);

    const data = response.body;

    if (isResponse(data)) {
      return transformResponse<FlinksGetAccountsSummaryResponse, GetAccountsSummaryResponse>(data);
    } else if (isAsyncResponse(data)) {
      return transformResponse<FlinksGetAccountsSummaryAsyncResponse, GetAccountsSummaryAsyncResponse>(data);
    } else {
      throw new Error(`Unexpected response code from getAccountsSummary: ${data.HttpStatusCode}`);
    }
  } catch (error) {
    debug('flinks getAccountsSummary error', error);

    throw error;
  }
};

export { getAccountsSummary };
