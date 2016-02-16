//TODO(ajax) I expect this component to get more complicated since we have a variety of ways that user names need to be rendered
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
