import FlinksClient from './client';

export { AuthorizeOptions, FlinksAuthorizeResponse, AuthorizeResponse } from './commands/authorize';

export {
  GetAccountsDetailOptions,
  GetAccountsDetailAsyncOptions,
  FlinksGetAccountsDetailResponse,
  FlinksGetAccountsDetailAsyncResponse,
  GetAccountsDetailResponse,
  GetAccountsDetailAsyncResponse
} from './commands/accounts-detail';

export {
  GetAccountsSummaryOptions,
  FlinksGetAccountsSummaryResponse,
  FlinksGetAccountsSummaryAsyncResponse,
  GetAccountsSummaryResponse,
  GetAccountsSummaryAsyncResponse
} from './commands/accounts-summary';

export {
  GetStatementsOptions,
  FlinksGetStatementsResponse,
  FlinksGetStatementsAsyncResponse,
  GetStatementsResponse,
  GetStatementsAsyncResponse
} from './commands/statements';

export * from './lib/authenticity';

export default FlinksClient;
