export const Username = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <span>
        Username: {this.props.username}
      </span>
    );
  }
});
