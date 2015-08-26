Package.describe({
  name: 'meteor-gazelle:user-sessions',
  version: '0.0.1',
  summary: 'Package for managing user sessions.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:lib',
    'meteor-gazelle:ip'
  ]);

  api.addFiles([
    'lib/userSessions.js',
    'lib/methods.js'
  ], 'server');

  api.export('UserSessionsManager');
});

Package.onTest(function (api) {
  api.use('meteor-gazelle:lib');
  api.use('meteor-gazelle:user-sessions');
  api.use('tinytest');
  api.use('practicalmeteor:chai');
  api.use('practicalmeteor:sinon');

  api.addFiles('tests/server.js', 'server');
});

