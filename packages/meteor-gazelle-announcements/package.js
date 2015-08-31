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
    'meteor-gazelle:lib'
  ]);

  api.addFiles([
    'lib/model.js',
  ], ['client', 'server']);

  api.export(['Announcement']);
});

Package.onTest(function (api) {

  api.use('meteor-gazelle:announcements', ['server']);
  api.use('tinytest', ['server']);

  api.addFiles('tests/server.js', 'server');
});
