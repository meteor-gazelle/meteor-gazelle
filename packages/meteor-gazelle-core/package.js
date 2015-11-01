Package.describe({
  name: 'meteor-gazelle:core',
  version: '0.0.1',
  summary: 'This package loads the core meteor-gazelle packages such as accounts or user classes.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:accounts@0.0.1',
    'meteor-gazelle:header@0.0.1',
    'meteor-gazelle:footer@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/components/AppLayout.jsx',
    'lib/routes.js'
  ]);

  api.export('AppLayout');

});
