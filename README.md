# Node Flinks

[![Build status](https://github.com/neofinancial/node-flinks/workflows/CI/badge.svg)](https://github.com/neofinancial/node-flinks/actions)

A Flinks API wrapper for Node.js

## Usage

### Installation

`yarn add node-flinks`

### Creating a client

```ts
import FlinksClient from 'node-flinks';

const flinks = new FlinksClient({
  instanceName: 'toolbox', // Flinks sandbox instance
  clientId: '43387ca6-0391-4c82-857d-70d95f087ecb' // Flinks sandbox clientId
});
```

### Making an authorize request

Before you can make any requests to the Flinks API you must first make an `authorize` request where you exchange a `loginId` for a `requestId`.

```ts
const requestId = await flinks.authorize({ loginId: '<your loginId>' });
```

### Requesting accounts detail

Once you have a `requestId` you can request the user's accounts detail.

```ts
const accountsDetail = await flinks.getAccountsDetail({ requestId: '<your requestId from earlier' });
```

### Debugging

This library uses the [debug](https://github.com/visionmedia/debug) library. To print debug messages for `node-flinks` set `DEBUG=node-flinks:*`.

### API

The API of this library mostly follows the Flinks API as specified in the [REST API docs](https://docs.flinks.io/reference/flinks-api). The main difference is that the Flinks API uses PascalCase for object keys and this library uses camelCase.

Here is a list of all the Flinks API endpoints along with the corresponding library method. We have not yet implemented all the endpoints in the Flinks REST API. If an endpoint you need is missing please consider submitting a pull request.

| Endpoint                     | Client Method             | Reference                                                                                     |
| ---------------------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| `/AnswerMFAQuestions`        | Not implemented           | [Docs](https://docs.flinks.io/reference/accounts-information#answermfaquestions)              |
| `/Attributes`                | Not implemented           | [Docs](https://docs.flinks.io/reference/attributes#attributes-api)                            |
| `/Authorize`                 | `authorize`               | [Docs](https://docs.flinks.io/reference/authorize-token#authorize-with-token)                 |
| `/DeleteCard`                | Not implemented           | [Docs](https://docs.flinks.io/reference/accounts-information#deletecard)                      |
| `/GenerateAuthorizeToken`    | Not implemented           | [Docs](https://docs.flinks.io/reference/authorize-token#generateauthorizetoken)               |
| `/GetAccountsDetail`         | `getAccountsDetail`       | [Docs](https://docs.flinks.io/reference/accounts-information#step-2-calling-for-data)         |
| `/GetAccountsDetailAsync`    | `getAccountsDetailAsync`  | [Docs](https://docs.flinks.io/reference/accounts-information#step-3-calling-for-pending-data) |
| `/GetAccountsSummary`        | `getAccountsSummary`      | [Docs](https://docs.flinks.io/reference/accounts-information#getaccountssummary)              |
| `/GetAccountsSummaryAsync`   | `getAccountsSummaryAsync` | [Docs](https://docs.flinks.io/reference/accounts-information#getaccountssummaryasync)         |
| `/GetAllAttributes`          | Not implemented           | [Docs](https://docs.flinks.io/reference/attributes#getallattributes)                          |
| `/GetCreditRiskAttributes`   | Not implemented           | [Docs](https://docs.flinks.io/reference/attributes#getcreditriskattributes)                   |
| `/GetIncomeAttributes`       | Not implemented           | [Docs](https://docs.flinks.io/reference/attributes#getincomeattributes)                       |
| `/GetMFAQuestions`           | Not implemented           | [Docs](https://docs.flinks.io/reference/accounts-information#getmfaquestions)                 |
| `/GetStatements`             | `getStatements`           | [Docs](https://docs.flinks.io/reference/accounts-information#getstatements-1)                 |
| `/GetUserAnalysisAttributes` | Not implemented           | [Docs](https://docs.flinks.io/reference/attributes#getuseranalysisattributes)                 |
| `/Investments`               | Not implemented           | [Docs](https://docs.flinks.io/reference/investments#investments-1)                            |
| `/SetScheduledRefresh`       | Not implemented           | [Docs](https://docs.flinks.io/reference/accounts-information#setscheduledrefresh)             |

## Contributing

### Development

1. Clone this repo
1. `yarn`
1. Build package with `yarn build` or turn on watch mode with `yarn watch`
1. Run client tests against Flinks API with `yarn test:client`

### Testing

#### `yarn test`

### Building

#### `yarn build`

If you need to clear the build cache run `yarn clean`

## Publishing

1. Update the version in `package.json`
1. Add a `CHANGELOG` entry
1. Commit your changes
1. Run `npm pack --dry-run` to see what will be published
1. Run `npm publish`
1. Create a release on GitHub. Use the version as the tag and release name. For example for version `1.0.0` the tag and release name would be `v1.0.0`.
