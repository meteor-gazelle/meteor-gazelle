import { Username } from './Username.jsx';
import { Profile } from './Profile.jsx';

export const UserProfile = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    userId: React.PropTypes.string.isRequired
  },

  getMeteorData () {
    const { userId } = this.props;
    const handle = Meteor.subscribe('userProfile', userId);

    return {
      isReady: handle.ready(),
      user: Meteor.users.findOne(userId)
    };
  },

  //TODO(ajax) Think about how to handle loading and errors throughout app.
  loading () {
    return 'Loading...';
  },

  content () {
    return this.data.user ? <Profile user = {this.data.user }/> : 'User not found.';
  },

  render () {
    return (
      <div>
        { this.data.isReady ? this.content() : this.loading() }
      </div>
    );
  }
});
