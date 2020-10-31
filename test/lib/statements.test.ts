import { isMessageValid } from '../../src/lib/authenticity';

const flinksResponse = {
  ResponseType: 'GetStatements',
  HttpStatusCode: 200,
  StatementsByAccount: [
    {
      AccountNumber: '1111000',
      Statements: [
        {
          UniqueId: '3DD209E106553D2BB0A6EFF57FD0480C',
          FileType: 'PDF',
          Base64Bytes: 'F0F0F0' // fake
        }
      ]
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
    const signature = 'Lzg63aaYBQN/dzQ7hAgi8UPW3k11v3XgvhvOlrKRSgU=';

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
