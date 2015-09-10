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
    'meteor-gazelle:core',
    'todda00:collection-revisions'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/articles.js',
    'lib/methods.js',
    'lib/routes.js',
    'lib/schemas.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/templates/article.html',
    'lib/templates/article.js',
    'lib/templates/create.html',
    'lib/templates/create.js',
    'lib/templates/edit.html',
    'lib/templates/edit.js',
    'lib/templates/wiki.html',
    'lib/templates/wiki.js',
  ], ['client']);

  api.addFiles([
    'publications.js'
  ], ['server']);

  api.export('Wiki');
  api.export('WikiController');
});

Package.onTest(function (api) {
});
