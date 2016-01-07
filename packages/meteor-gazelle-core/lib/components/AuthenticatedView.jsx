AuthenticatedView = React.createClass({
  render() {
    return (
      <div className='main-container'>
        <Header />
        <div className='main-content'>
          {this.props.yield}
        </div>
        <Footer />
      </div>
    )
  }
});
