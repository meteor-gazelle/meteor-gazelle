Package.describe({
  name: 'gazelle-header',
  version: '0.0.1',
  summary: 'The site header.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'gazelle-lib'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/methods.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/nav/nav.html',
    'lib/client/nav/nav.js',
    'lib/client/userMenu/userMenu.html',
    'lib/client/userMenu/userMenu.js',
    'lib/client/header/header.html',
    'lib/client/header/header.js',

  ], ['client']);

});

Package.onTest(function (api) {
});