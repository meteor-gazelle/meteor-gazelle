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
    'fourseven:scss@3.4.0-beta1',
    'wolves:bourbon@3.1.0',
    'wolves:neat@3.1.0',
    'fortawesome:fontawesome@4.4.0'
  ]);
});

Package.onTest(function (api) {
});
