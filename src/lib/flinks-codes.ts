export interface FlinksCodes {
  [key: string]: string;
}

const flinksCodes: FlinksCodes = {
  OPERATION_PENDING:
    'The process is ongoing in the background. At this point your flow must change to the async endpoint.',
  OPERATION_DISPATCHED: 'Your sync request took more than 210 seconds and it was dispatched in the background',
  INVALID_LOGIN: 'The provided LoginId is invalid | The provided username or/and password is/are invalid',
  INVALID_REQUEST: 'Credentials are missing/incomplete, or syntax is incorrect (e.g. missing comma)',
  SESSION_NONEXISTENT: 'A request was made with an expired RequestId',
  CARD_IN_USE: 'An operation was requested while the account is still being processed',
  INVALID_USERNAME: 'The username provided was different from what the bank expected',
  INVALID_PASSWORD: 'The password provided was different from what the bank expected',
  INVALID_SECURITY_RESPONSE: 'The MFA response provided was different from what the bank expected',
  QUESTION_NOT_FOUND: "The MFA prompt doesn't have a stored answer",
  RETRY_LATER: 'Flinks was not able to open a connection with the selected financial institution',
  UNKNOWN_CHALLENGE_KEY: 'The /Authorize request to respond an MFA contain an answer to the wrong MFA prompt',
  CONCURRENT_SESSION: 'Another session is already opened with this LoginId',
  UNAUTHORIZED:
    'The card was not authorized. Either there is a problem with bank, or the GetAccountsDetail endpoint was called before authorized',
  DISABLED_LOGIN:
    'The account has been deactivated by the financial institution. The account holder must contact their bank.',
  NEW_ACCOUNT:
    'The end user must take action directly on their online banking before connecting and account with Flinks',
  SESSION_EXPIRED:
    'The RequestId expired after 8 mins of inactivity during Authorize or 30 mins timeout for data processing',
  ALREADY_AUTHORIZED: 'When the /Authorize endpoint is called after the user has already been authorized',
  SECURITYRESPONSES_INCOMPLETE: 'Not all the prompted MFA questions had answers in the reponse request',
  NO_TRANSACTION:
    'The account does not have any transactions | The account does not have the minimum amount of transactions (at least 25) required to perform your request',
  DISABLED_INSTITUTION: 'The selected financial institution is not available',
  AGGREGATION_ERROR: 'Flinks had an unexpected error and could not process your request',
  METHOD_NOT_AVAILABLE:
    'The requested API is not currenly enabled in your instance. Kindly contact us if you wish to use this feature.'
};

export { flinksCodes };
