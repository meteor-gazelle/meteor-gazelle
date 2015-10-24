Template.nav.helpers({
  menu: function () {
    return [ // TODO: This should be configurable and/or data-driven
      {
        title: 'Torrents',
        url: '/torrents',

        children: [
          {
            title: 'All Torrents',
            url: '/torrents/all',

            children: [
              {
                title: 'Music',
                url: '/torrents/music'
              },
              {
                title: 'Applications',
                url: '/torrents/applications'
              },
              {
                title: 'Literary',
                url: '/torrents/literary'
              },
              {
                title: 'Learning',
                url: '/torrents/learning'
              },
              {
                title: 'Comedy',
                url: '/torrents/comedy'
              },
              {
                title: 'Comics',
                url: '/torrents/comics'
              }
            ]
          },
          {
            title: 'Collages',
            url: '/collages'
          },
          {
            title: 'Notifications',
            url: '/notifications'
          }
        ]
      },

      {
        title: 'Requests',
        url: '/requests'
      },

      {
        title: 'Collages',
        url: '/collages'
      },

      {
        title: 'Forums',
        url: '/forums'
      },

      {
        title: 'Rules',
        url: '/rules'
      },

      {
        title: 'Help',
        url: '/help',

        children: [
          {
            title: 'Help Wiki',
            url: '/wiki'
          },

          {
            title: 'IRC Help Channel',
            url: '/irc'
          },

          {
            title: 'Contact Staff',
            url: '/staff-inbox'
          },

          {
            title: 'Report',
            url: '/report'
          }
        ]
      },

      {
        title: 'Store',
        url: '/store'
      }
    ];
  }
});

Template.nav.onCreated(function () {});

Template.nav.onRendered(function () {

});

Template.nav.onDestroyed(function () {
  //add your statement here
});
