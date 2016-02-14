Package.describe({
  name: 'meteor-gazelle:router',
  version: '0.0.1',
  summary: 'This package handles routing',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'ecmascript',
    'kadira:flow-router@2.10.0',
    'kadira:react-layout@1.5.3'
  ];

  api.use(packages);
  api.imply(packages);

  api.mainModule('lib/router.js', 'client');

  api.export('Router', 'client');
});
