Package.describe({
  name: 'meteor-gazelle:behaviors',
  version: '0.0.1',
  summary: 'Provides behaviors for Meteor MongoDB collections',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');
  var CLIENT_SERVER = ['client', 'server'];

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'matb33:collection-hooks@0.8.0'
  ];

  api.use(packages);

  api.addFiles([
    'lib/behaviors.js'
  ], CLIENT_SERVER);

  api.export('Behaviors', CLIENT_SERVER);
});

Package.onTest(function (api) {
  var CLIENT_SERVER = ['client', 'server'];

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:behaviors@0.0.1',
    'sanjo:jasmine@0.15.5'
  ];

  api.use(packages);
  api.addFiles('tests/jasmine/behaviorTests.js', CLIENT_SERVER);
  api.addFiles('tests/jasmine/client/integration/behaviorClientTests.js', 'client');
});
