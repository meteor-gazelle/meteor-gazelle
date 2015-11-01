//TODO(ajax) Should this be in the core package or be moved to the lib package?
AppLayout = React.createClass({
  render() {
    return (
      <div>
        <Components.Header />
        {this.props.content}
        <Components.Footer />
      </div>
    );
  }
});
