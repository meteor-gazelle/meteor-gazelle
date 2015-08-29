Package.describe({
  name: 'meteor-gazelle:user-class-permissions',
  version: '0.0.1',
  summary: 'User permissions',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:core'
  ]);

  api.addFiles([
  ]);

  api.addFiles([
  ], 'client');

  api.addFiles([
  ], 'server');


});

Package.onTest(function (api) {
});
