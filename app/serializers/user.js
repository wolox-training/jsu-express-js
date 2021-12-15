exports.createReponseUser = user => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
});

exports.listUsers = ({ count: total, rows }) => ({
  total,
  users: rows
});
