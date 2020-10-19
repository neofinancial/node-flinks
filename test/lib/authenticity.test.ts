import { isMessageValid } from '../../src/lib/authenticity';

const flinksResponse = {
  ResponseType: 'GetAccountsDetail',
  HttpStatusCode: 200,
  Accounts: [
    {
      TransitNumber: '77777',
      InstitutionNumber: '777',
      OverdraftLimit: 0,
      Title: 'Chequing CAD',
      AccountNumber: '1111000',
      Category: 'Operations',
      Type: 'Chequing',
      Currency: 'CAD',
      Id: 'ae1dac72-70da-4626-fed8-08d682e1ff4a'
    }
  ],
  Login: {
    Username: 'Greatday',
    IsScheduledRefresh: false,
    LastRefresh: '2019-05-09T13:47:46.5227901',
    Type: 'Personal',
    Id: '5e115eac-1209-4f19-641c-08d6d484e2fe'
  },
  Institution: 'FlinksCapital',
  RequestId: '1243c283-e0ca-4fda-a5e4-343068430190'
};

describe('isMessageValid', () => {
  test('valid message is valid', () => {
    const message = JSON.stringify(flinksResponse);
    const signature = 'nLYJnRna62Xi08IQQfeKjkR1avL8c947yXsBXUDbjTY=';

    expect(isMessageValid(message, signature, 'secret')).toBe(true);
  });

  test('bad signature is invalid', () => {
    const message = JSON.stringify(flinksResponse);
    const signature = 'badsignature';

    expect(isMessageValid(message, signature, 'secret')).toBe(false);
  });

  test('bad message is invalid', () => {
    const message = JSON.stringify(flinksResponse).replace('a', 'e');
    const signature = 'nLYJnRna62Xi08IQQfeKjkR1avL8c947yXsBXUDbjTY=';

    expect(isMessageValid(message, signature, 'secret')).toBe(false);
  });
});
