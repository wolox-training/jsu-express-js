exports.validateEmail = email => {
  const regexpEmail = /^\w+@wolox.com.co$/g;
  return regexpEmail.test(email);
};

exports.verifyPassword = (password = '') => {
  const regexpEmail = /^[a-zA-Z0-9_]{8,}$/g;
  return regexpEmail.test(password);
};
