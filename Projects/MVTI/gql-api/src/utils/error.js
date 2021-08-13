import _ from 'lodash';

const CustomError = (name, config) => {
  if (!config || _.isNil(config.message)) {
    throw new Error('CustomError should contain error message');
  }
  const err = new Error(config.message);
  err.name = name;
  return err;
};

export { CustomError as default };
