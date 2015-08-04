Template.secondaryNav.events({
  'click .secondary-nav__item--signout > .secondary-nav__link': function () {
    Meteor.logout();
  }
});
