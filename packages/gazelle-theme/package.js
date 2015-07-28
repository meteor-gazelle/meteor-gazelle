Package.describe({
  name: 'gazelle-theme',
  version: '0.0.1',
  summary: 'meteor-gazelle default theme',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Npm.depends({
  'bourbon': '4.2.3',
  'bourbon-neat': '1.7.2',
  'font-awesome': '4.3.0'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use(['fourseven:scss']);

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

  api.addFiles([
    '.npm/package/node_modules/font-awesome/fonts/FontAwesome.otf',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
  ], 'client');
});

Package.onTest(function (api) {
});
