Roles.userHasRoles = function (userId, roles) {
  return Roles.userIsInRole(userId, roles, 'class') ||
    Roles.userIsInRole(userId, roles);
};