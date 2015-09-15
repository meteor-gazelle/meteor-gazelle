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
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:user-sessions@0.0.1',
    'meteor-gazelle:ip@0.0.1'
  ]);

  api.addFiles([
    'lib/models/loginAttempts.js',
    'lib/methods.js',
    'lib/publications.js'
  ], 'server');

  api.addFiles([
    'lib/templates/index.html',
    'lib/templates/index.js',
    'lib/templates/bannedIp.html'
  ], 'client');

  api.addFiles([
    'lib/models/bannedIps.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.export('IpManager', 'server');
});

Package.onTest(function (api) {
  api.use('meteor-gazelle:lib@0.0.1');
  api.use('meteor-gazelle:ip-manager@0.0.1');
  api.use('meteor-gazelle:ip@0.0.1');
  api.use('sanjo:jasmine@0.15.5');

  api.addFiles('tests/jasmine/server/integration/methodTests.js', 'server');
});
