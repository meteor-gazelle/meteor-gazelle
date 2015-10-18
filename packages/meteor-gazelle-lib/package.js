Package.describe({
  name: 'meteor-gazelle:lib',
  version: '0.0.1',
  summary: 'Provides mission critical packages and functionality.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  var packages = [
    'meteor-platform',
    'reactive-var',
    'reactive-dict',
    'kadira:flow-router@2.6.0',
    'kadira:blaze-layout@2.1.0',
    'accounts-password@1.1.1',
    'useraccounts:flow-routing@1.12.3',
    'useraccounts:unstyled@1.12.3',
    'maxharris9:classnames@0.0.1',
    'aldeed:collection2@2.5.0',
    'aldeed:simple-schema@1.3.3',
    'matb33:collection-hooks@0.8.0',
    'meteorhacks:subs-manager@1.6.2',
    'ongoworks:security@1.2.0',
    'aldeed:template-extension@3.4.3',
    'aldeed:autoform@5.5.1',
    'aldeed:delete-button@1.0.0',
    'kadira:debug@2.2.3',
    'arillo:flow-router-helpers@0.4.5'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/gazelle.js',
    'lib/callbacks.js',
    'lib/util.js'
  ]);

  api.export('Gazelle');
  api.export('Util');

});

