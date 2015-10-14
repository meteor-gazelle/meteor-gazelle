Package.describe({
  name: 'meteor-gazelle:permissions',
  version: '0.0.1',
  summary: 'Provides group based permissions.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  var packages = [
    'meteor-gazelle:lib'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/schema.js',
    'lib/permissions.js',
    'lib/routes.js'
  ]);

  api.addFiles([
    'lib/templates/classes/userClasses.html',
    'lib/templates/classes/userClasses.js',
    'lib/templates/classes/userClassCreate.html',
    'lib/templates/classes/userClassCreate.js',
    'lib/templates/classes/userClassEdit.html',
    'lib/templates/classes/userClassEdit.js'
  ], 'client');

  api.export('Permissions');

});

