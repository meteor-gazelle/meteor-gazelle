Package.describe({
  name: 'meteor-gazelle:createdby',
  version: '0.0.1',
  summary: 'Base functionality for createdby.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:core',
    'jagi:astronomy',
    'jagi:astronomy-timestamp-behavior'
  ]);

  api.addFiles([
    ['lib/package.js',
     'lib/behavior/behavior.js',
     'lib/behavior/events.js']
  ]);

  api.export(['CreatedBy']);
});

Package.onTest(function (api) {
});