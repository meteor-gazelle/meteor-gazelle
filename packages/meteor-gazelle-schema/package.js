Package.describe({
  name: 'meteor-gazelle:schema',
  version: '0.0.1',
  summary: 'Helps generate schema consumed by meteor-gazelle packages. To \
            be used alongside the meteor-simple-schema package.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.addFiles([
    'gazelleSchema.js'
  ], ['client', 'server']);

  api.export('GazelleSchema');
});

Package.onTest(function (api) {
});
