export default Object.freeze({
  LOCALHOST: 'localhost',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
  // eslint-disable-next-line max-len
  VALID_EMAIL_REGEX: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  VALID_PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
});
