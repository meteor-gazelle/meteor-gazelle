Package.describe({
  name: 'meteor-gazelle:method-mixins',
  version: '0.0.1',
  summary: 'This package handles users',
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

  api.mainModule('lib/mixins.js');
});
