UserMenu = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState () {
    return {
      animating: false,
      expanded: false
    };
  },

  getMeteorData () {
    const currentUser = Meteor.user();

    return {
      username: currentUser ? currentUser.username : null
    };
  },

  onAvatarClick () {
    const { expanded } = this.state;

    this.setState({
      animating: true,
      expanded: !expanded
    });
  },

  onSignOutClick () {
    Meteor.logout((err) => {
      FlowRouter.go('/');
    });
  },

  classNames () {
    const { animating, expanded } = this.state;

    return classNames({
      'user-menu': true,
      'user-menu--animating': animating,
      'user-menu--active': expanded,
      'user-menu--inactive': !expanded
    });
  },

  render () {
    const { expanded } = this.state;
    const { username } = this.data;
    const classNames = this.classNames();

    return (
      <div className={classNames} role='menu'>
        <div className='user-menu__username__container'>
          {username}

          <dl className='user-menu__stats'>
            <dt className='user-menu__stats__label'>Up</dt>
            <dd className='user-menu__stats__value'>XX</dd>

            <dt className='user-menu__stats__label'>Down</dt>
            <dd className='user-menu__stats__value'>XX</dd>

            <dt className='user-menu__stats__label'>Ratio</dt>
            <dd className='user-menu__stats__value'>XX</dd>

            <dt className='user-menu__stats__label'>Required</dt>
            <dd className='user-menu__stats__value'>XX</dd>
          </dl>
        </div>

        <div className='user-menu__avatar__container'
             onClickCapture={this.onAvatarClick}>
          <div className='user-menu__avatar'
               role='button'
               aria-expanded={expanded}>
             {/* TODO Avatar Img Here */}
          </div>

          <ul className='user-menu__menu' role='menu'>
              <li className='user-menu__menu__item'>
                <span className='user-menu__menu__item__signout'
                      onClick={this.onSignOutClick}>
                  Sign out
                </span>
              </li>
          </ul>
        </div>
      </div>
    );
  }

});
