Package.describe({
  name: 'meteor-gazelle:wiki',
  version: '0.0.1',
  summary: 'The wiki is a place where users can put their knowledge to work, \
            and write articles or guides for the community.',
  documentation: 'README.md',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'meteor-gazelle:lib',
    'todda00:collection-revisions'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
  ]);

  api.export('Wiki');
});

Package.onTest(function (api) {
});
