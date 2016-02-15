export const PublicView = React.createClass({
  render () {
    // What the user sees when not logged in
    return (
      <div className='main-container'>
        <div className='main-content'>
          { this.props.yield }
        </div>
      </div>
      );
  }
});
