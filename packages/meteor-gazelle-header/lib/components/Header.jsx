Components.Header = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData () {
    return {
      siteName: Meteor.settings.public.site.name
    };
  },

  render () {
    const { siteName } = this.data;

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
