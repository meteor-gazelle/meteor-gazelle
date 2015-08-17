Package.describe({
  name: 'meteor-gazelle:announcements',
  version: '0.0.1',
  summary: 'Base functionality for announcements.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:core'
  ]);

  api.addFiles([
    'lib/index.html',
    'lib/index.js',
    'lib/create.html',
    'lib/create.js'
  ], ['client']);

  api.addFiles([
    'lib/config.js',
    'lib/schemas.js',
    'lib/model.js',
    'lib/routes.js'
  ]);

  //TODO(ajax) Remove considering unit tests.
  api.export(['Announcement']);
});

Package.onTest(function (api) {

  api.use('meteor-gazelle:announcements', ['server']);
  api.use('tinytest', ['server']);

  api.addFiles('tests/server.js', 'server');
});
