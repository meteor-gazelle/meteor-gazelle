SecondaryNav = React.createClass({

  onSignOutClick () {
    Meteor.logout((err) => {
      FlowRouter.go('/');
    });
  },

  render () {
    return (
      <div className='secondary-nav'>
        <nav>
          <ul className='secondary-nav__list'>
            <li className='secondary-nav__item secondary-nav__item--upload'>
              <a className='secondary-nav__link' href='/upload'>
                      Upload
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/inbox'>
                      Inbox
                    </a>
              { /* TODO: Add unread count */ }
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/notifications'>
                      Notifications
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/stats'>
                      Statistics
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/bookmarks'>
                      Bookmarks
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/comments'>
                      Comments
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/friends'>
                      Friends
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/invite'>
                      Invite
                    </a>
            </li>
            <li className='secondary-nav__item'>
              <a className='secondary-nav__link' href='/donate'>
                      Donate
                    </a>
            </li>
            <li className='secondary-nav__item secondary-nav__item--profile'>
              <a className='secondary-nav__link' href='/profile'>
                      Edit Profile
                    </a>
            </li>
            <li className='secondary-nav__item secondary-nav__item--signout'>
              <span className='secondary-nav__link' onClick={ this.onSignOutClick }>
                      Logout
                    </span>
            </li>
          </ul>
        </nav>
        <div className='secondary-nav__search'>
          <SearchBox showButton placeholder='Search Torrents' />
        </div>
      </div>
      );
  }

});
