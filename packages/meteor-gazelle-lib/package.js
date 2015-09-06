Package.describe({
  name: 'meteor-gazelle:lib',
  version: '0.0.1',
  summary: 'meteor-gazelle internal packages.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-platform@1.2.2',
    'aldeed:autoform@5.3.2',
    'aldeed:collection2@2.3.3',
    'aldeed:simple-schema@1.3.3',
    'iron:router@1.0.9',
    'dburles:collection-helpers@1.0.3',
    'accounts-password@1.1.1',
    'zimme:iron-router-auth@3.1.0',
    'reactive-var@1.0.5',
    'jquery@1.11.3_2',
    'maxharris9:classnames@0.0.1',
    'fourseven:scss@3.2.0',
    'accounts-ui@1.1.5',
    'useraccounts:core@1.11.1',
    'jagi:astronomy@0.12.1',
    'jagi:astronomy-validators@0.10.8',
    'jagi:astronomy-behaviors@0.6.0',
    'jagi:astronomy-timestamp-behavior@0.5.0'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/core.js',
    'lib/collections.js'
  ]);

  api.export([
    'Gazelle'
  ]);
});

Package.onTest(function (api) {
});
