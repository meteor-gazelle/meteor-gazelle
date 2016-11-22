Package.describe({
  name: 'meteor-gazelle:header',
  version: '0.0.1',
  summary: 'This package loads the header',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:util@0.0.1',
    'meteor-gazelle:accounts@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.mainModule('lib/client.js', 'client');

});
