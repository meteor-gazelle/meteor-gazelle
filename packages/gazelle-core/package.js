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

    'lib/client/stylesheets/core.scss',
    'lib/client/stylesheets/default.scss',
    'lib/client/stylesheets/public.scss',
    'lib/client/stylesheets/_public.scss',
    'lib/client/stylesheets/_mixins.scss',
    'lib/client/stylesheets/_layout.scss',
    'lib/client/stylesheets/_font-awesome-custom.scss',
    'lib/client/stylesheets/_layout.scss',
    'lib/client/stylesheets/_mixins.scss',
    'lib/client/templates/layout/layout.html'
  ], 'client');

  api.addFiles([
    'scss.json',
    'lib/router/config.js'
  ], ['client', 'server']);

});

Package.onTest(function (api) {
});
