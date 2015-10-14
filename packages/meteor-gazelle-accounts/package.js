Package.describe({
  name: 'meteor-gazelle:accounts',
  version: '0.0.1',
  summary: 'Configures meteor-useraccounts for meteor-gazelle.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/schema.js',
    'lib/config.js'
  ]);

});
