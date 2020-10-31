import got, { Got } from 'got';

import { authorize, AuthorizeOptions, AuthorizeResponse } from './commands/authorize';
import {
  getAccountsDetail,
  GetAccountsDetailOptions,
  GetAccountsDetailResponse,
  GetAccountsDetailAsyncResponse
} from './commands/accounts';

import {
  getAccountsSummary,
  GetAccountsSummaryOptions,
  GetAccountsSummaryResponse,
  GetAccountsSummaryAsyncResponse
} from './commands/accounts-summary';

import {
  getStatements,
  GetStatementsOptions,
  GetStatementsResponse,
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

  public getAccountsSummary(
    options: GetAccountsSummaryOptions
  ): Promise<GetAccountsSummaryResponse | GetAccountsSummaryAsyncResponse> {
    return getAccountsSummary(this.client, options);
  }

  public getStatements(options: GetStatementsOptions): Promise<GetStatementsResponse | GetStatementsAsyncResponse> {
    return getStatements(this.client, options);
  }
}

export default FlinksClient;
