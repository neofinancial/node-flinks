import crypto from 'crypto';
import createDebug from 'debug';

const debug = createDebug('node-flinks:lib:authenticity');

const isMessageValid = (message: string, signature: string, verificationKey: string): boolean => {
  const messageBuffer = Buffer.from(message);
  const keyBuffer = Buffer.from(verificationKey);
  const hmac = crypto.createHmac('sha256', keyBuffer);

  hmac.update(messageBuffer);

  const computedSignature = hmac.digest('base64');

  debug('message signature', signature);
  debug('computed signature', computedSignature);

  return signature === computedSignature;
};

const generateMessageSignature = (message: string, signingKey: string): string => {
  const messageBuffer = Buffer.from(message);
  const keyBuffer = Buffer.from(signingKey);
  const hmac = crypto.createHmac('sha256', keyBuffer);

  hmac.update(messageBuffer);

  return hmac.digest('base64');
};

export { isMessageValid, generateMessageSignature };
