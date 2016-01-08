PublicView = React.createClass({
  render() {
    return (
      <div className='main-container'>
        <div className='main-content'>
          { this.props.yield }
        </div>
      </div>
      );
  }
});
