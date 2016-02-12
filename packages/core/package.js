Package.describe({
  name: 'meteor-gazelle:core',
  version: '0.0.1',
  summary: 'This package loads the core meteor-gazelle packages such as accounts or user classes.',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1',
    'meteor-gazelle:router@0.0.1',
    'meteor-gazelle:header@0.0.1',
    'meteor-gazelle:footer@0.0.1',
    //'meteor-gazelle:users@0.0.1',
    //'meteor-gazelle:permissions@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  //api.addFiles([
  //  'lib/components/App.jsx',
  //  'lib/components/PublicView.jsx',
  //  'lib/components/AuthenticatedView.jsx',
  //  'lib/components/Welcome.jsx',
  //  'lib/components/Login.jsx',
  //  'lib/components/Register.jsx',
  //  'lib/routes.jsx'
  //]);

  api.mainModule('lib/client.js', 'client');



});
