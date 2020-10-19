/* eslint-disable no-console */

import FlinksClient from '.';

(async (): Promise<void> => {
  const flinks = new FlinksClient('toolbox', '43387ca6-0391-4c82-857d-70d95f087ecb');

  try {
    const authorizeResult = await flinks.authorize({ loginId: '186b8552-b9e5-4858-030d-08d872163ed4' });

    console.log('authorize result', authorizeResult);

    const getAccountsDetailResult = await flinks.getAccountsDetail({
      requestId: authorizeResult.requestId,
      withTransactions: false
    });

    console.log('getAccountsDetail result', getAccountsDetailResult);
  } catch (error) {
    console.log(error);
  }
})();
