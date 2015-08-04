Package.describe({
  name: 'gazelle-lib',
  version: '0.0.1',
  summary: 'meteor-gazelle internal packages.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-platform',
    'aldeed:autoform@5.3.2',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'iron:router',
    'dburles:collection-helpers',
    'accounts-password',
    'zimme:iron-router-auth',
    'reactive-var',
    'jquery',
    'maxharris9:classnames',
    'fourseven:scss',
    'accounts-ui',
    'useraccounts:core',
    'useraccounts:core',
    'ongoworks:security'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/core.js',
    'lib/collections.js'
  ], ['client', 'server']);

  api.export([
    'Gazelle'
  ]);
});

Package.onTest(function (api) {
});
