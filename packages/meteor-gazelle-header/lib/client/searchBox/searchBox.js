Template.searchBox.events({
  'click search-box__button': function () {
    Template.instance().$('input.search-box__input').trigger('search');
  }
});
