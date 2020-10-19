import camelcaseKeys from 'camelcase-keys';

const transformOptions = <T, U>(options: T): U | undefined => {
  if (options) {
    const output = camelcaseKeys(options, { deep: true, pascalCase: true });

    return (output as unknown) as U;
  }
};

const transformResponse = <T, U>(response: T): U => {
  const output = camelcaseKeys(response, { deep: true });

  return (output as unknown) as U;
};

export { transformOptions, transformResponse };
