Package.describe({
  name: 'meteor-gazelle:permissions',
  version: '0.0.1',
  summary: 'This package handles user permissions',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);

  /*
  api.addFiles([
    'lib/permissionGroup.js',
    'lib/collections.js',
    'lib/permissions.js'
  ]);

  api.addFiles([
    'lib/server/permissions.js',
    'lib/server/publications.js'
  ], 'server');

  api.addFiles([
    'lib/client/subscriptions.js'
  ], 'client');

  api.export('PermissionGroup');
  api.export('Permissions');
  //TODO(ajax) Does PermissionsCollection need to be exported?
  api.export('PermissionsCollection');

  */

  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');
});

Package.onTest(function (api) {
  /*
  var packages = [
    'tinytest',
    'meteor-gazelle:lib',
    'meteor-gazelle:core',
    'meteor-gazelle:permissions'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    //'tests/server/permissions.js'
  ], 'server');

  api.addFiles([
    'tests/client/permissions.js'
  ]);
  */
});
