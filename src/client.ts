import got, { Got } from 'got';

import { authorize, AuthorizeOptions, AuthorizeResponse } from './commands/authorize';
import {
  getAccountsDetail,
  GetAccountsDetailOptions,
  GetAccountsDetailResponse,
  getAccountsDetailAsync,
  GetAccountsDetailAsyncResponse,
  GetAccountsDetailAsyncOptions
} from './commands/accounts-detail';
import {
  getAccountsSummary,
  GetAccountsSummaryOptions,
  GetAccountsSummaryResponse,
  getAccountsSummaryAsync,
  GetAccountsSummaryAsyncOptions,
  GetAccountsSummaryAsyncResponse
} from './commands/accounts-summary';
import {
  getStatements,
  GetStatementsOptions,
  GetStatementsResponse,
  getStatementsAsync,
  GetStatementsAsyncOptions,
  GetStatementsAsyncResponse
} from './commands/statements';

class FlinksClient {
  private client: Got;

  public constructor(instanceName: string, customerId: string) {
    this.client = got.extend({
      prefixUrl: `https://${instanceName}-api.private.fin.ag/v3/${customerId}`
    });
  }

  public authorize(options: AuthorizeOptions): Promise<AuthorizeResponse> {
    return authorize(this.client, options);
  }

  public getAccountsDetail(
    options: GetAccountsDetailOptions
  ): Promise<GetAccountsDetailResponse | GetAccountsDetailAsyncResponse> {
    return getAccountsDetail(this.client, options);
  }

  public getAccountsDetailAsync(
    options: GetAccountsDetailAsyncOptions
  ): Promise<GetAccountsDetailResponse | GetAccountsDetailAsyncResponse> {
    return getAccountsDetailAsync(this.client, options);
  }

  public getAccountsSummary(
    options: GetAccountsSummaryOptions
  ): Promise<GetAccountsSummaryResponse | GetAccountsSummaryAsyncResponse> {
    return getAccountsSummary(this.client, options);
  }

  public getAccountsSummaryAsync(
    options: GetAccountsSummaryAsyncOptions
  ): Promise<GetAccountsSummaryResponse | GetAccountsSummaryAsyncResponse> {
    return getAccountsSummaryAsync(this.client, options);
  }

  public getStatements(options: GetStatementsOptions): Promise<GetStatementsResponse | GetStatementsAsyncResponse> {
    return getStatements(this.client, options);
  }

  public getStatementsAsync(
    options: GetStatementsAsyncOptions
  ): Promise<GetStatementsResponse | GetStatementsAsyncResponse> {
    return getStatementsAsync(this.client, options);
  }
}

export default FlinksClient;
