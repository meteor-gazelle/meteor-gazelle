Package.describe({
  name: 'meteor-gazelle:header',
  version: '0.0.1',
  summary: 'The site\'s header.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/client/nav/nav.html',
    'lib/client/nav/nav.js',
    'lib/client/userMenu/userMenu.html',
    'lib/client/userMenu/userMenu.js',
    'lib/client/header/header.html',
    'lib/client/header/header.js',
    'lib/client/searchBox/searchBox.html',
    'lib/client/searchBox/searchBox.js',
    'lib/client/secondaryNav/secondaryNav.html',
    'lib/client/secondaryNav/secondaryNav.js'
  ], ['client']);

});

Package.onTest(function (api) {
});
