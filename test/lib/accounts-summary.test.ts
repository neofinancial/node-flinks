import { isMessageValid } from '../../src/lib/authenticity';

const flinksResponse = {
  ResponseType: 'GetAccountsSummary',
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
      Id: 'ae1dac72-70da-4626-fed8-08d682e1ff4a',
      Holder: 'John Flinkyfoot',
      Balance: {
        Available: 6.04,
        Current: 49993.96,
        Limit: 5000
      }
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
    const signature = 'ojahxTBoMUfLsZyAoT67qXix1H0faUKXFTmu6V7vHeE=';

    expect(isMessageValid(message, signature, 'secret')).toBe(true);
  });

  test('bad signature is invalid', () => {
    const message = JSON.stringify(flinksResponse);
    const signature = 'badsignature';

    expect(isMessageValid(message, signature, 'secret')).toBe(false);
  });

  test('bad message is invalid', () => {
    const message = JSON.stringify(flinksResponse).replace('a', 'e');
    const signature = 'Lc+We2IOaDnEwxzynulc1M8VOuyXpVe+H8ep0iuqWhk=';

    expect(isMessageValid(message, signature, 'secret')).toBe(false);
  });
});
