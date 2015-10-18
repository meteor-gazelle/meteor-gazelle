Package.describe({
  name: 'meteor-gazelle:core',
  version: '0.0.1',
  summary: 'This package loads the core meteor-gazelle packages such as accounts or user classes.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:accounts@0.0.1',
    'meteor-gazelle:header@0.0.1',
    'meteor-gazelle:footer@0.0.1',
    'meteor-gazelle:permissions@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/config.js'
  ]);

  api.addFiles([
    'lib/helpers/siteName.js',
    'lib/layout.html'
  ], 'client');

});
