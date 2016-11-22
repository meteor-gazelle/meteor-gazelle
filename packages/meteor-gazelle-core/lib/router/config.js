Gazelle.controllers = {};

Router.configure({
  layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn');

ApplicationController = RouteController.extend();