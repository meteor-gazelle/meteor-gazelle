Package.describe({
  name: 'meteor-gazelle:accounts',
  version: '0.0.1',
  summary: 'Internal package used to interface with Meteor Accounts',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'useraccounts:unstyled@1.0.1'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/client/templates/login.html'
  ], 'client');

  api.addFiles([
    'lib/accounts.js'
  ], ['client', 'server']);

});

Package.onTest(function (api) {
});
