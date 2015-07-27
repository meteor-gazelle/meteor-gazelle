Package.describe({
  name: 'gazelle-theme',
  version: '0.0.1',
  summary: 'meteor-gazelle default theme',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'johnantoni:meteor-normalize',
    'fourseven:scss',
    'wolves:bourbon',
    'wolves:neat',
    'reywood:font-awesome-sass'
  ]);

  api.addFiles([
    'scss.json',
    'stylesheets/_font-awesome-custom.scss',
    'stylesheets/_layout.scss',
    'stylesheets/_mixins.scss',
    'stylesheets/_public.scss',
    'stylesheets/_useraccounts.scss',
    'stylesheets/_variables.scss',
    'stylesheets/core.scss',
    'stylesheets/default.scss',
    'stylesheets/public.scss'
  ]);
});

Package.onTest(function (api) {
});
