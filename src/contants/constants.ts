export default Object.freeze({
  LOCALHOST: 'localhost',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
  VALID_EMAIL_REGEX: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  VALID_PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,

  ENCRYPTION_KEY: 'eves-ENCRYPTION_KEY',
  ENCRYPTION_SALT: 'eves-ENCRYPTION_SALT',
});