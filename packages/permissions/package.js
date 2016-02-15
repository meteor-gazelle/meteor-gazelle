Package.describe({
  name: 'meteor-gazelle:permissions',
  version: '0.0.1',
  summary: 'This package handles user permissions',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');
});

Package.onTest(function (api) {
  var packages = [
    'meteor-gazelle:lib',
    'meteor-gazelle:permissions',
    'publication-collector',
    'practicalmeteor:mocha'
  ];

  api.use(packages);

  api.addFiles([
    'tests/client.js'
  ], 'client');

  api.addFiles([
    'tests/client.js'
  ], 'client');

  api.addFiles([
    'tests/server.js'
  ], 'server');

});
