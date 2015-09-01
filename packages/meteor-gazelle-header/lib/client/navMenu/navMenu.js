Template.navMenu.helpers({
  classNames: function () {
    var depth = Template.instance().depth;
    return 'main-nav__level' + depth;
  },

  depth: function () {
    return Template.instance().depth;
  },

  maxDepth: function () {
    return Template.instance().maxDepth;
  }
});

Template.navMenu.onCreated(function () {
  this.depth = this.data.depth || 1;
  this.maxDepth = this.data.maxDepth || 0x7fffffff;
});
