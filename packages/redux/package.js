Package.describe({
  name: 'meteor-gazelle:redux',
  version: '0.0.1',
  summary: 'Provides Redux and friends.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Npm.depends({
  'redux': '3.3.1',
  'redux-thunk': '1.0.3',
  'redux-logger': '2.5.2'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'ecmascript',
    'underscore'
  ];

  api.use(packages);

  api.mainModule('lib/index.js');

  api.export('Redux');
});
