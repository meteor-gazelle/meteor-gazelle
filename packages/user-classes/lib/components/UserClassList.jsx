import { ManageUserClass } from './ManageUserClass.jsx';

export const UserClassList = React.createClass({
  propTypes: {
    userClasses: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  },

  render () {
    return (
      <div>
        { this.props.userClasses.map(userClass => <ManageUserClass key = { userClass._id } userClass={ userClass }/>) }
      </div>
    );
  }
});
