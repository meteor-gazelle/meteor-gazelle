HomeController = ApplicationController.extend({
  index: function () {
    this.render('home');
  }
});

Router.route('/home', {
  name: 'home',
  controller: HomeController,
  action: 'index'
});
