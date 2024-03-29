import createDebug from 'debug';
import { Got } from 'got';

import FlinksError from '../lib/flinks-error';
import {
  FlinksResponseBase,
  FlinksStatementsResponse,
  FlinksLoginResponse,
  ResponseBase,
  LoginResponse,
  StatementsResponse,
} from '../types';
import { transformOptions, transformResponse } from '../lib/transform-keys';
import { addBearerTokenHeader } from '../lib/headers';

interface FlinksGetStatementsOptions {
  requestId: string;
  NumberOfStatements?: string;
  AccountsFilter?: string[];
}

export interface GetStatementsOptions {
  requestId: string;
  numberOfStatements?: string;
  accountsFilter?: string[];
  accessToken?: string;
}

export interface GetStatementsAsyncOptions {
  requestId: string;
  accessToken?: string;
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
  mostRecentCached: true,
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
    ...options,
  });

  const flinksClient = addBearerTokenHeader(client, options.accessToken);

  debug('request options', requestOptions);

  try {
    const response = await flinksClient.post<FlinksGetStatementsResponse | FlinksGetStatementsAsyncResponse>(
      `BankingServices/GetStatements`,
      {
        json: {
          ...requestOptions,
        },
        responseType: 'json',
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
    if (error.response?.body) {
      debug('flinks getStatements error response', error.response.body);

      throw new FlinksError('getStatements', { ...error.response.body });
    } else {
      debug('flinks getStatements error', error);

      throw error;
    }
  }
};

const getStatementsAsync = async (
  client: Got,
  options: GetStatementsAsyncOptions
): Promise<GetStatementsResponse | GetStatementsAsyncResponse> => {
  const flinksClient = addBearerTokenHeader(client, options.accessToken);

  try {
    const response = await flinksClient.post<FlinksGetStatementsResponse | FlinksGetStatementsAsyncResponse>(
      `BankingServices/GetStatementsAsync/${options.requestId}`,
      {
        responseType: 'json',
      }
    );

    debug('flinks getStatementsAsync response', response.body);

    const data = response.body;

    if (isResponse(data)) {
      return transformResponse<FlinksGetStatementsResponse, GetStatementsResponse>(data);
    } else if (isAsyncResponse(data)) {
      return transformResponse<FlinksGetStatementsAsyncResponse, GetStatementsAsyncResponse>(data);
    } else {
      throw new Error(`Unexpected response code from getStatementsAsync: ${data.HttpStatusCode}`);
    }
  } catch (error) {
    if (error.response?.body) {
      debug('flinks getStatementsAsync error response', error.response.body);

      throw new FlinksError('getStatementsAsync', { ...error.response.body });
    } else {
      debug('flinks getStatementsAsync error', error);

      throw error;
    }
  }
};

export { getStatements, getStatementsAsync };
