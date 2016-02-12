import { Util } from 'meteor/meteor-gazelle:util';
import { UserMenu } from './UserMenu.jsx';
import { Nav } from './Nav.jsx';
import { SecondaryNav } from './SecondaryNav.jsx';

export const Header = React.createClass({
  render () {
    return (
      <header className='main-header' role='banner'>
        <div className='main-header__container'>
          <h1 className='main-title'>
                  <a className='main-title__link' href='/home'>
                    { Util.getSiteName() }
                  </a>
                </h1>
          <UserMenu />
          <Nav />
        </div>
        <SecondaryNav />
      </header>
      );
  }
});
