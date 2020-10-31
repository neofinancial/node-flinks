export interface FlinksResponseLink {
  rel: string;
  href: string;
  example?: string;
}

export interface FlinksResponseBase {
  HttpStatusCode: number;
  Links: FlinksResponseLink[];
}

export interface FlinksLoginResponse {
  Username: string;
  IsScheduledRefresh: boolean;
  LastRefresh: Date;
  Type: string;
  Id: string;
}

export interface FlinksTransactionResponse {
  Date: string;
  Code: string | null;
  Description: string;
  Debit: number | null;
  Credit: number | null;
  Balance: number;
  Id: string;
}

export interface FlinksBalanceResponse {
  Available: number | null;
  Current: number;
  Limit: number | null;
}

export interface FlinksAddressResponse {
  CivicAddress: string;
  City: string;
  Province: string;
  PostalCode: string;
  POBox: string | null;
  Country: string;
}

export interface FlinksHolderResponse {
  Name: string;
  Address: FlinksAddressResponse;
  Email: string;
  PhoneNumber: string;
}

export interface FlinksAccountResponse {
  Transactions: FlinksTransactionResponse[];
  TransitNumber: string;
  InstitutionNumber: string;
  OverdraftLimit: number;
  Title: string;
  AccountNumber: string;
  Balance: FlinksBalanceResponse;
  Category: string;
  Type: string;
  Currency: string;
  Holder: FlinksHolderResponse;
  Id: string;
}

export interface FlinksSummaryAccountResponse {
  TransitNumber: string;
  InstitutionNumber: string;
  OverdraftLimit: number;
  Title: string;
  AccountNumber: string;
  Balance: FlinksBalanceResponse;
  Category: string;
  Type: string;
  Currency: string;
  Holder: FlinksHolderResponse;
  EftEligibleRatio: number;
  Id: string;
}

export interface FlinksStatementsResponse {
  AccountNumber: string;
  Statements: FlinksStatementResponse[];
}

export interface FlinksStatementResponse {
  UniqueId: string;
  FileType: string;
  Base64Bytes: string;
}

export interface ResponseBase {
  httpStatusCode: number;
  links: FlinksResponseLink[];
}

export interface LoginResponse {
  username: string;
  isScheduledRefresh: boolean;
  lastRefresh: Date;
  type: string;
  id: string;
}

export interface TransactionResponse {
  date: string;
  code: string | null;
  description: string;
  debit: number | null;
  credit: number | null;
  balance: number;
  id: string;
}

export interface BalanceResponse {
  available: number | null;
  current: number;
  limit: number | null;
}

export interface AddressResponse {
  civicAddress: string;
  city: string;
  province: string;
  postalCode: string;
  poBox: string | null;
  country: string;
}

export interface HolderResponse {
  name: string;
  address: FlinksAddressResponse;
  email: string;
  phoneNumber: string;
}

export interface AccountResponse {
  transactions: FlinksTransactionResponse[];
  transitNumber: string;
  institutionNumber: string;
  overdraftLimit: number;
  title: string;
  accountNumber: string;
  balance: FlinksBalanceResponse;
  category: string;
  type: string;
  currency: string;
  holder: FlinksHolderResponse;
  id: string;
}

export interface StatementsResponse {
  accountNumber: string;
  statements: StatementResponse[];
}

export interface StatementResponse {
  uniqueId: string;
  fileType: string;
  base64Bytes: string;
}
