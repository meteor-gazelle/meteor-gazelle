const siteName = Meteor.settings.site.name; // TODO: Move to utility

Components.Header = React.createClass({

  render () {
    return (
      <header className='main-header' role='banner'>
        <div className='main-header__container'>
          <h1 className='main-title'>
            <a className='main-title__link' href='/home'>
              {siteName}
            </a>
          </h1>

          <Components.UserMenu />
          <Components.Nav />
        </div>

        <Components.SecondaryNav />
      </header>
    );
  }

});
