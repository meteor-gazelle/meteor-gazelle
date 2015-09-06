Package.describe({
  name: 'meteor-gazelle:users',
  version: '0.0.1',
  summary: 'Base functionality for users.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:lib@0.0.1'
  ]);

  api.addFiles([
    'lib/users.js',
    'lib/methods.js'
  ], ['client', 'server']);

  api.export(['User']);
});

Package.onTest(function (api) {
  api.use('meteor-gazelle:lib@0.0.1', ['server']);
  api.use('meteor-gazelle:users@0.0.1', ['server']);
  api.use('sanjo:jasmine@0.18.0');
  api.use('velocity:html-reporter@0.8.2');

  api.addFiles('tests/jasmine/server/integration/methodTests.js', 'server');
});
