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
    'meteor-base',
    'mobile-experience',
    'standard-minifiers-js',
    'ecmascript',
    'es5-shim',
    'underscore',
    'check',
    'mongo',
    'tracker',
    'accounts-password',
    'react',
    'reactive-dict',
    'mdg:validated-method@1.0.1',
    'mdg:validation-error@0.3.0',
    'aldeed:collection2@2.8.0',
    'aldeed:simple-schema@1.5.3',
    'dburles:collection-helpers',
    'maxharris9:classnames',
    'matb33:collection-hooks@0.8.1',
    'meteorhacks:subs-manager@1.6.3',
    'meteor-gazelle:redux',
    'meteor-gazelle:router',
    'meteor-gazelle:method-mixins'
  ];

  api.use(packages);
  api.imply(packages);

});

