Package.describe({
  name: 'meteor-gazelle:hooks',
  version: '0.0.1',
  summary: 'This package provides hooks and callbacks',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'ecmascript',
    'check'
  ];

  api.use(packages);

  api.mainModule('lib/hooks.js', 'server');
});

Package.onTest(function (api) {
  var packages = [
    'ecmascript',
    'practicalmeteor:mocha',
    'meteor-gazelle:hooks'
  ];

  api.use(packages);

  api.addFiles([
    'tests/server.js'
  ], 'server');

});
