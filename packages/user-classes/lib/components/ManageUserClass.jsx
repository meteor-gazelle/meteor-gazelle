export const ManageUserClass = React.createClass({
  propTypes: {
    userClass: React.PropTypes.object.isRequired,
  },

  render () {
    return (
      <div>
        { this.props.userClass.title }
      </div>
    );
  }
});
