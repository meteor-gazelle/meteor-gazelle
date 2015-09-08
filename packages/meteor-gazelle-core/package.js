Package.describe({
  name: 'meteor-gazelle:core',
  version: '0.0.1',
  summary: 'meteor-gazelle internal packages.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:users@0.0.1',
    'meteor-gazelle:accounts@0.0.1',
    'meteor-gazelle:header@0.0.1',
    'meteor-gazelle:footer@0.0.1'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/client/startup.js',
    'lib/client/templates/layout/layout.html'
  ], 'client');

  api.addFiles([
    'lib/router/config.js'
  ], ['client', 'server']);

});

Package.onTest(function (api) {
});
