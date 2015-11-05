//TODO(ajax) Should this be in the core package or be moved to the lib package?
AppLayout = React.createClass({
  render () {
    return (
      <div className='main-ontent'>
        <Components.Header />
        <div className='main-container'>
          {this.props.content}
        </div>
        <Components.Footer />
      </div>
    );
  }
});
