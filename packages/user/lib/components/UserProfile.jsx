import { Actions } from '../redux.js';
import { Username } from './Username.jsx';

export const UserProfile = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    userId: React.PropTypes.string.isRequired
  },

  getMeteorData () {
    debugger;
    const handle = Meteor.subscribe('userProfile', this.props.userId);
    if (handle.ready()) {
      Redux.store.dispatch(Actions.loadProfile(this.props.userId));
    }
    const userProfile = Redux.store.getState().userProfile;
    return {
      userId: userProfile.get('id'),
      username: userProfile.get('username'),
      error: userProfile.get('error')
    };
  },

  //TODO(ajax) Not found can be made into a generic component
  notFound () {
    return 'User not found';
  },

  render () {
    return (
      <div>
        { this.data.error ?
          this.notFound() : <Username username={ this.data.username }/> }
      </div>
    );
  }
});
