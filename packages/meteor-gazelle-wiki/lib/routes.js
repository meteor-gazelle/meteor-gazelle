WikiController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('announcements');
  },
  data: function () {
    return {
      wiki: Articles.find({}, { sort: { createdAt: -1 }})
    };
  },
  article: function () {
    var params = this.getParams();
    var id = params._id;
    this.render('index', {
      data: function () {
        return Articles.find({}, { sort: { createdat: -1 }});
      }
    });
  },
  index: function () {
    var params = this.getParams();
    var id = params._id;
    this.render('article', {
      data: function () { return Articles.findOne( { _id: this._id }); }
    });
  },
  create: function () {
    this.render('create');
  },
  edit: function () {
    var params = this.getParams();
    var id = params._id;
    this.render('edit', {
      data: function () { return Articles.findOne( { _id: this._id }); }
    });
  }
});

Router.route('/wiki/:_id', {
  name: 'wiki/article',
  controller: WikiController,
  action: 'article'
});

Router.route('/wiki', {
  name: 'wiki',
  controller: WikiController,
  action: 'index'
});

Router.route('/wiki/create', {
  name: 'wiki/create',
  controller: WikiController,
  action: 'create'
});

Router.route('/wiki/edit/:_id', {
  name: 'wiki/edit',
  controller: WikiController,
  action: 'edit'
});