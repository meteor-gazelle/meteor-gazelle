AuthenticatedView = React.createClass({
  render() {
    return (
      <div className='main-container'>
        <Components.Header />
        <div className='main-content'>
          {this.props.yield}
        </div>
        <Components.Footer />
      </div>
    )
  }
});
