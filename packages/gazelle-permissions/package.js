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
    'lib/config.js',
    'lib/schema.js',
    'lib/model.js'
  ], ['client', 'server']);

  api.export('Permissions');
});

Package.onTest(function (api) {
});
