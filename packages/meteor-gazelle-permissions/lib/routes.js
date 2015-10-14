FlowRouter.route('/admin/user-classes', {
  name: 'admin/user-classes',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {
      header: 'header',
      main: 'userClasses'
    });
  }
});


var classRoutes = FlowRouter.group({
  prefix: '/admin/classes',
  name: 'adminUserClasses',
  triggersEnter: [AccountsTemplates.ensureSignedIn]
});

classRoutes.route('/', {
  name: 'userClasses',
  action: function() {
    BlazeLayout.render('layout', {
      header: 'header',
      main: 'userClasses'
    });
  }
});

classRoutes.route('/create', {
  name: 'userClassCreate',
  action: function() {
    BlazeLayout.render('layout', {
      header: 'header',
      main: 'userClassCreate'
    });
  }
});

classRoutes.route('/edit/:id', {
  name: 'userClassEdit',
  action: function() {
    BlazeLayout.render('layout', {
      header: 'header',
      main: 'userClassEdit'
    });
  }
});
