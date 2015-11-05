//TODO(ajax) Should this be in the core package or be moved to the lib package?
AppLayout = React.createClass({
  render () {
    return (
      <div className='main-container'>
        <Components.Header />
        <div className='main-content'>
          {this.props.content}
        </div>
        <Components.Footer />
      </div>
    );
  }
});
