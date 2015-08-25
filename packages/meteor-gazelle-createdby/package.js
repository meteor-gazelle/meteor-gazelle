Package.describe({
  name: 'meteor-gazelle:astronomy-createdby-behavior',
  version: '0.0.1',
  summary: 'Base functionality for createdby.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'meteor-gazelle:core',
    'jagi:astronomy'
  ]);

  api.addFiles([
    'lib/behavior/behavior.js',
    'lib/behavior/events.js'
  ]);

  api.export(['CreatedBy']);
});

Package.onTest(function (api) {
  api.use('meteor-gazelle:core', ['server']);
  api.use('jagi:astronomy', ['server']);
  api.use('tinytest', ['server']);
  api.use('useraccounts:iron-routing', ['server']);

  api.addFiles('lib/tests/server.js', 'server');
  api.addFiles('lib/tests/createdByTester.js', 'server');
}); 