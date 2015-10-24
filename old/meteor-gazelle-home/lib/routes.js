FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {
      header: 'header',
      main: 'home'
    });
  }
});
