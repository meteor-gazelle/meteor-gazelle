Package.describe({
  name: 'meteor-gazelle:lib',
  version: '0.0.1',
  summary: 'Provides mission critical packages and functionality.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});


//TODO(ajax) Go over packages and versions
Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'standard-minifiers',
    'meteor-base',
    'mobile-experience',
    'mongo',
    'session',
    'jquery',
    'tracker',
    'logging',
    'reload',
    'random',
    'ejson',
    'check',
    'react',
    'ecmascript',
    'reactive-var',
    'accounts-password',
    'kadira:flow-router@2.10.0',
    'kadira:react-layout@1.5.3',
    'maxharris9:classnames',
    'aldeed:collection2@2.8.0',
    'aldeed:simple-schema@1.5.3',
    'matb33:collection-hooks@0.8.1',
    'meteorhacks:subs-manager@1.6.3',
    'mdg:validated-method@1.0.0'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/config.js',
    'lib/util.js'
  ]);

  api.export('Router');
  api.export('Components');
  api.export('Util');

});

