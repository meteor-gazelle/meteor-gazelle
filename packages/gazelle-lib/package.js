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
    'aldeed:autoform',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'iron:router',
    'alanning:roles',
    'dburles:collection-helpers',
    'accounts-ui',
    'accounts-password',
    'zimme:iron-router-auth',
    'ongoworks:security',
    'velocity:console-reporter',
    'useraccounts:unstyled',
    'sanjo:jasmine',
    'velocity:html-reporter',
    'fourseven:scss',
    'reactive-var',
    'wolves:bourbon',
    'wolves:neat',
    'reywood:font-awesome-sass',
    'johnantoni:meteor-normalize',
    'maxharris9:classnames'
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
