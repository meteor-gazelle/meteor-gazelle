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
    'meteor-gazelle:redux',
    'reactive-dict'
  ];

  api.use(packages);
  api.imply(packages);

  api.mainModule('lib/client.js', 'client');
});

Package.onTest(function (api) {
  var packages = [
    'meteor-gazelle:test',
    'practicalmeteor:mocha'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles('tests/test.js');

});
