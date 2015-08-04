Template.userMenu.helpers({
  ariaExpanded: function () {
    return Template.instance().expanded.get() ? 'true' : 'false';
  },

  classNames: function () {
    var template = Template.instance();
    var expanded = template.expanded.get();
    var animating = template.animating.get();

    return classNames({
      'user-menu': true,
      'user-menu--animating': animating,
      'user-menu--active': expanded,
      'user-menu--inactive': !expanded
    });
  }
});

Template.userMenu.events({
  'click .user-menu__avatar__container': function (event) {
    var template = Template.instance();
    var expanded = template.expanded;

    template.animating.set(true);
    expanded.set(!expanded.get());
    event.stopPropagation();
  },

  'click #user-menu__menu__item__signout': function (event) {
    Meteor.logout();
  },
});

Template.userMenu.onCreated(function () {
  this.expanded = new ReactiveVar(false);
  this.animating = new ReactiveVar(false);
});

Template.userMenu.onRendered(function () {
  var self = this;
  var expanded = self.expanded;

  this.onDocumentClick = function (event) {
    if (!$.contains(self.find('.user-menu', event.target)) && expanded.get()) {
      expanded.set(false);
    }
  };

  $(document).on('click', self.onDocumentClick);
});

Template.userMenu.onDestroyed(function () {
  $(document).off('click', this.onDocumentClick);
});
