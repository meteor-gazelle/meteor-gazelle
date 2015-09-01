Template.navItem.helpers({
  classNames: function () {
    var template = Template.instance();
    var animating = template.animating;
    var expanded = template.expanded;
    var hasSubmenu = _hasSubmenu();

    return _prefixedClassNames({
      __item: true,
      '__item--animating': animating.get(),
      '__item--expanded': expanded.get(),
      '__item--submenu': hasSubmenu
    });
  },

  linkClassNames: function () {
    return _prefixedClassNames({
      __link: true
    });
  },

  submenuClassNames: function () {
    return _prefixedClassNames({
      __submenu: true
    });
  },

  hasSubmenu: function () {
    return _hasSubmenu();
  },

  childDepth: function () {
    return Template.currentData().depth + 1;
  },

  childMaxDepth: function () {
    return Template.currentData().maxDepth - 1;
  }
});

Template.navItem.events({
  mouseover: function (event) {
    var template = Template.instance();
    var animating = template.animating;
    var expanded = template.expanded;

    animating.set(true);
    expanded.set(true);
  },

  mouseout: function (event) {
    var template = Template.instance();
    var expanded = template.expanded;

    expanded.set(false);
  }
});

Template.navItem.onCreated(function () {
  this.animating = ReactiveVar(false);
  this.expanded = ReactiveVar(false);
});

function _prefixedClassNames (cssClasses) {
  var depth = Template.currentData().depth;
  var prefix = 'main-nav__level' + depth;

  return classNames(Object.keys(cssClasses).reduce(function (prev, curr) {
    prev[prefix + curr] = cssClasses[curr];
    return prev;
  }, {}));
}

function _hasSubmenu () {
  var data = Template.currentData();
  var children = data.children;
  var depth = data.depth;
  var maxDepth = data.maxDepth;
  return !!children && children.length > 0 && depth < maxDepth;
}
