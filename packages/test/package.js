Package.describe({
  name: 'meteor-gazelle:test',
  version: '0.0.1',
  summary: 'This package handles users',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.3-modules-beta.7');

  var packages = [
    'ecmascript',
    'meteor-gazelle:test2'
  ];

  api.use(packages);
  api.imply(packages);

  api.mainModule('lib/client/test.js', 'client');
  api.mainModule('lib/server/test.js', 'server');
});
