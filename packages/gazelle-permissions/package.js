Package.describe({
  name: 'gazelle-permissions',
  version: '0.0.1',
  summary: 'Provides functionality for user permissions.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'gazelle-lib',
    'gazelle-schema',
    'gazelle-users',
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/schema.js',
    'lib/permissions.js'
  ], ['server']);

  api.export(['Permissions', 'SitePermissions'])
});

Package.onTest(function (api) {
  api.use('gazelle-lib', ['server']);
  api.use('gazelle-permissions', ['server']);
  api.use('tinytest', ['server']);
  api.use('practicalmeteor:chai', ['server']);
  api.use('practicalmeteor:sinon', ['server']);

  api.addFiles('tests/server.js', 'server');
});
