Package.describe({
  name: 'gazelle-ipmanager',
  version: '0.0.1',
  summary: 'Base functionality for managing connecting ip addresses.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'gazelle-lib'
  ]);

  api.addFiles([
    'lib/loginAttempt.js',
    'lib/functions.js',
    'lib/bannedIp.js',
    'lib/methods.js',
  ], ['client', 'server']);

  api.export(['IpManager']);
});

Package.onTest(function (api) {

  api.use('gazelle-lib', ['server']);
  api.use('gazelle-users', ['server']);
  api.use('tinytest', ['server']);
  api.use('practicalmeteor:chai', ['server']);
  api.use('practicalmeteor:sinon', ['server']);

  api.addFiles('tests/server.js', 'server');
});
