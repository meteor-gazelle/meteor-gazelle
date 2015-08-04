Template.footer.helpers({
  year: function () {
    return moment().format('YYYY');
  },

  date: function () {
    // This is client time, not server time. This may have little meaning
    return moment().format('MMM D YYYY, HH:mm');
  }
});
