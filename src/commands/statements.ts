import createDebug from 'debug';
import { Got } from 'got';

import {
  FlinksResponseBase,
  FlinksStatementsResponse,
  FlinksLoginResponse,
  ResponseBase,
  LoginResponse,
  StatementsResponse
} from '../types';
import { transformOptions, transformResponse } from '../lib/transform-keys';

interface FlinksGetStatementsOptions {
  requestId: string;
  NumberOfStatements?: string;
  AccountsFilter?: string[];
}

export interface GetStatementsOptions {
  requestId: string;
  numberOfStatements?: string;
  accountsFilter?: string[];
}

export interface FlinksGetStatementsResponse extends FlinksResponseBase {
  StatementsByAccount: FlinksStatementsResponse[];
  Login: FlinksLoginResponse;
  Institution: string;
  RequestId: string;
}

export interface FlinksGetStatementsAsyncResponse extends FlinksResponseBase {
  FlinksCode: string;
  Message: string;
  RequestId: string;
}

export interface GetStatementsResponse extends ResponseBase {
  statementsByAccount: StatementsResponse[];
  login: LoginResponse;
  institution: string;
  requestId: string;
}

export interface GetStatementsAsyncResponse extends ResponseBase {
  flinksCode: string;
  message: string;
  requestId: string;
}

const debug = createDebug('node-flinks:commands:statements');

const defaultOptions = {
  mostRecentCached: true
};

const isResponse = (
  data: FlinksGetStatementsResponse | FlinksGetStatementsAsyncResponse
): data is FlinksGetStatementsResponse => {
  return data.HttpStatusCode === 200;
};

const isAsyncResponse = (
  data: FlinksGetStatementsResponse | FlinksGetStatementsAsyncResponse
): data is FlinksGetStatementsResponse => {
  return data.HttpStatusCode === 202;
};

const getStatements = async (
  client: Got,
  options: GetStatementsOptions
): Promise<GetStatementsResponse | GetStatementsAsyncResponse> => {
  const requestOptions = transformOptions<GetStatementsOptions, FlinksGetStatementsOptions>({
    ...defaultOptions,
    ...options
  });

  debug('request options', requestOptions);

  try {
    const response = await client.post<FlinksGetStatementsResponse | FlinksGetStatementsAsyncResponse>(
      `BankingServices/GetStatements`,
      {
        json: {
          ...requestOptions
        },
        responseType: 'json'
      }
    );

    debug('flinks getStatements response', response.body);

    const data = response.body;

    if (isResponse(data)) {
      return transformResponse<FlinksGetStatementsResponse, GetStatementsResponse>(data);
    } else if (isAsyncResponse(data)) {
      return transformResponse<FlinksGetStatementsAsyncResponse, GetStatementsAsyncResponse>(data);
    } else {
      throw new Error(`Unexpected response code from getStatements: ${data.HttpStatusCode}`);
    }
  } catch (error) {
    debug('flinks getStatements error', error);

    throw error;
  }
};

export { getStatements };
