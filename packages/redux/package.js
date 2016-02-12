Package.describe({
  name: 'redux',
  version: '0.0.1',
  summary: 'Wraps redux npm package.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Npm.depends({
  'redux': '3.3.1'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'ecmascript'
  ];

  api.use(packages);

  api.mainModule('lib/redux.js');
});
