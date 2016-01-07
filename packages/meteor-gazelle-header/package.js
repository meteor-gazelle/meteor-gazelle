Package.describe({
  name: 'meteor-gazelle:header',
  version: '0.0.1',
  summary: 'This package loads the header',
  git: 'https://github.com/meteor-gazelle/meteor-gazelle',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  var packages = [
    'meteor-gazelle:lib@0.0.1'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/components/Header.jsx',
    'lib/components/Nav.jsx',
    'lib/components/NavItem.jsx',
    'lib/components/NavMenu.jsx',
    'lib/components/SearchBox.jsx',
    'lib/components/SecondaryNav.jsx',
    'lib/components/UserMenu.jsx'
  ]);

  api.export('Header');
});
