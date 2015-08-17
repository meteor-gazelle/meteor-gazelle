Package.describe({
  name: 'meteor-gazelle-usersessions',
  version: '0.0.1',
  summary: 'Base functionality for managing user sessions.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle-lib',
    'jagi:astronomy',
    'jagi:astronomy-validators'
  ]);

  api.addFiles([
    'lib/userSessions.js',
    'lib/methods.js'
  ], ['client', 'server']);

  api.export(['UserSessionsManager']);
});

Package.onTest(function (api) {
  api.use('meteor-gazelle-lib', ['server']);
  api.use('meteor-gazelle-users', ['server']);
  api.use('tinytest', ['server']);
  api.use('practicalmeteor:chai', ['server']);
  api.use('practicalmeteor:sinon', ['server']);

  api.addFiles('tests/server.js', 'server');
});
