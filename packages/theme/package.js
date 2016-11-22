Package.describe({
  name: 'meteor-gazelle:theme',
  version: '0.0.1',
  summary: 'meteor-gazelle default theme',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {

  api.versionsFrom('1.2.0.2');

  api.use([
    'fourseven:scss@3.4.1',
    'wolves:bourbon@3.1.0',
    'wolves:neat@3.1.0',
    'johnantoni:meteor-normalize@0.0.1',
    'reywood:font-awesome-sass@4.4.0_1'
  ]);

  api.addFiles([
    'lib/_font-awesome-custom.scss',
    'lib/_fonts.scss',
    'lib/_layout.scss',
    'lib/_mixins.scss',
    'lib/_public.scss',
    'lib/_useraccounts.scss',
    'lib/_variables.scss',
    'lib/style.scss'
  ], 'client');

  api.addAssets([
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

Package.onTest(function (api) {});
