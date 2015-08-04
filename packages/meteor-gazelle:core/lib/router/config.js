Gazelle.controllers = {};

Router.configure({
  layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn');
