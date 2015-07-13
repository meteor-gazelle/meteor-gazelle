Template.nav.helpers({
  //add you helpers here
});

Template.nav.events({
  'mouseenter .main-nav__link': function (event) {
    $(event.currentTarget)
      .closest('.main-nav__item')
      .addClass('main-nav__item--hover');
  },

  'mouseleave .main-nav__link': function (event) {
    $(event.currentTarget)
      .closest('.main-nav__item')
      .removeClass('main-nav__item--hover');
  }
});

Template.nav.onCreated(function () {});

Template.nav.onRendered(function () {

});

Template.nav.onDestroyed(function () {
  //add your statement here
});
