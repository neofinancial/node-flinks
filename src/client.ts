import got, { Got } from 'got';

import { authorize, AuthorizeOptions, AuthorizeResponse } from './commands/authorize';
import {
  getAccountsDetail,
  GetAccountsDetailOptions,
  GetAccountsDetailResponse,
  GetAccountsDetailAsyncResponse
} from './commands/accounts';

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
}

export default FlinksClient;
