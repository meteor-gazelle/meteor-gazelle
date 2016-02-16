import { Username } from './Username.jsx';

export const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render () {
    return (
      <div>
        <Username username={this.props.user.username} />
      </div>
    );
  }
});
