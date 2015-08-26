Package.describe({
  name: 'meteor-gazelle:ip-manager',
  version: '0.0.1',
  summary: 'Package for managing connecting ip addresses.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:lib',
    'meteor-gazelle:user-sessions',
    'meteor-gazelle:ip'
  ]);

  api.addFiles([
    'lib/loginAttempts.js',
    'lib/bannedIps.js',
    'lib/methods.js'
  ], 'server');

  api.export('IpManager');
});

Package.onTest(function (api) {
  api.use('meteor-gazelle:lib');
  api.use('meteor-gazelle:ip-manager');
  api.use('tinytest');
  api.use('practicalmeteor:chai');
  api.use('practicalmeteor:sinon');

  api.addFiles('tests/server.js', 'server');
});
