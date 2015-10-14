Package.describe({
  name: 'meteor-gazelle:theme',
  version: '0.0.1',
  summary: 'meteor-gazelle default theme',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Npm.depends({
  'bourbon': '4.2.3',
  'bourbon-neat': '1.7.2',
  'node-normalize-scss': '1.0.3',
  'font-awesome': '4.3.0'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'fourseven:scss@3.2.0'
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

  api.addFiles([
    '.npm/package/node_modules/font-awesome/fonts/FontAwesome.otf',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    '.npm/package/node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
    'fonts/Lato_Bold/Lato-Bold.eot',
    'fonts/Lato_Bold/Lato-Bold.svg',
    'fonts/Lato_Bold/Lato-Bold.ttf',
    'fonts/Lato_Bold/Lato-Bold.woff',
    'fonts/Lato_Bold_Italic/Lato-BoldItalic.eot',
    'fonts/Lato_Bold_Italic/Lato-BoldItalic.svg',
    'fonts/Lato_Bold_Italic/Lato-BoldItalic.ttf',
    'fonts/Lato_Bold_Italic/Lato-BoldItalic.woff',
    'fonts/Lato_Italic/Lato-Italic.eot',
    'fonts/Lato_Italic/Lato-Italic.svg',
    'fonts/Lato_Italic/Lato-Italic.ttf',
    'fonts/Lato_Italic/Lato-Italic.woff',
    'fonts/Lato_Light/Lato-Light.eot',
    'fonts/Lato_Light/Lato-Light.svg',
    'fonts/Lato_Light/Lato-Light.ttf',
    'fonts/Lato_Light/Lato-Light.woff',
    'fonts/Lato_Light_Italic/Lato-LightItalic.eot',
    'fonts/Lato_Light_Italic/Lato-LightItalic.svg',
    'fonts/Lato_Light_Italic/Lato-LightItalic.ttf',
    'fonts/Lato_Light_Italic/Lato-LightItalic.woff',
    'fonts/Lato_Regular/Lato-Regular.eot',
    'fonts/Lato_Regular/Lato-Regular.svg',
    'fonts/Lato_Regular/Lato-Regular.ttf',
    'fonts/Lato_Regular/Lato-Regular.woff',
    'fonts/Merriweather_Light/Merriweather-Light.eot',
    'fonts/Merriweather_Light/Merriweather-Light.svg',
    'fonts/Merriweather_Light/Merriweather-Light.ttf',
    'fonts/Merriweather_Light/Merriweather-Light.woff',
    'images/bg-header-footer-lg.png'
  ], 'client');
});

Package.onTest(function (api) {
});
