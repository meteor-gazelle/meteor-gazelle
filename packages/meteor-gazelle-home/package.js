Package.describe({
  name: 'meteor-gazelle:home',
  version: '0.0.1',
  summary: 'The home page of meteor-gazelle.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:core'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
      'lib/home.html',
      'lib/home.js',
    ], ['client']);

  api.addFiles([
    'lib/routes.js'
  ], ['client', 'server']);

});

Package.onTest(function (api) {
});
