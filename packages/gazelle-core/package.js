Package.describe({
  name: 'gazelle-core',
  version: '0.0.1',
  summary: 'meteor-gazelle internal packages.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'gazelle-lib',
    'gazelle-users',
    'gazelle-accounts',
    'gazelle-header',
    'gazelle-footer'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/client/templates/layout/layout.html'
  ], 'client');

  api.addFiles([
    'lib/router/config.js'
  ], ['client', 'server']);

});

Package.onTest(function (api) {
});
