Package.describe({
  name: 'meteor-gazelle:util',
  version: '0.0.1',
  summary: 'This package provides useful utility functions.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'ecmascript'
  ];

  api.use(packages);

  api.mainModule('lib/util.js');
});
