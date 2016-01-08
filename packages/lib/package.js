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
    'kadira:flow-router',
    'kadira:react-layout',
    'accounts-password',
    'maxharris9:classnames',
    'aldeed:collection2',
    'aldeed:simple-schema',
    'matb33:collection-hooks',
    'meteorhacks:subs-manager'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/config.js',
    'lib/util.js'
  ]);

  api.export('Router');
  api.export('Components');

});

