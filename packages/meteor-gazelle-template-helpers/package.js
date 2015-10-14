Package.describe({
  name: 'meteor-gazelle:template-helpers',
  version: '0.0.1',
  summary: 'Template helpers used by the app.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');


  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/siteName.js'
  ]);
});

Package.onTest(function (api) {
});
