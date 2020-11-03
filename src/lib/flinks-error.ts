import { flinksCodes } from './flinks-codes';

export interface FlinksErrorResponse {
  HttpStatusCode: number;
  Message?: string;
  FlinksCode: string;
}

class FlinksError extends Error {
  httpStatusCode: number;
  flinksCode: string;
  flinksMessage: string | undefined;
  flinksDescription: string;

  constructor(message: string, flinksErrorResponse: FlinksErrorResponse) {
    super(`${message}: ${flinksErrorResponse.HttpStatusCode} ${flinksErrorResponse.FlinksCode}`);
    this.name = 'FlinksError';
    this.httpStatusCode = flinksErrorResponse.HttpStatusCode;
    this.flinksCode = flinksErrorResponse.FlinksCode;
    this.flinksMessage = flinksErrorResponse.Message;
    this.flinksDescription = flinksCodes[this.flinksCode] || `Unknown Flinks code: ${this.flinksCode}`;
  }
}

export default FlinksError;
