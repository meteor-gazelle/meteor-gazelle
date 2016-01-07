//TODO(ajax) Should the Home package be loaded on the app level or by the core package?

Package.describe({
  name: 'meteor-gazelle:home',
  version: '0.0.1',
  summary: 'This package loads the home content',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:core@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/components/Home.jsx',
    'lib/components/Test.jsx',
    'lib/routes.jsx'
  ]);

  api.export('Home');
});
