Template.navMenu.helpers({
  classNames: function () {
    var depth = Template.instance().depth;
    return 'main-nav__level' + depth;
  },

  depth: function () {
    return Template.instance().depth;
  }
});

Template.navMenu.onCreated(function () {
  this.depth = this.data.depth || 1;
});
