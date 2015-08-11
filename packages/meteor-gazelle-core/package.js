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
    'meteor-gazelle:lib',
    'meteor-gazelle:users',
    'meteor-gazelle:accounts',
    'meteor-gazelle:header',
    'meteor-gazelle:footer'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/site-name.js',
    'lib/layout.html'
  ], 'client');

  api.addFiles([
    'lib/config.js'
  ], ['client', 'server']);

  api.export('ApplicationController', ['client', 'server']);

});

Package.onTest(function (api) {
});
