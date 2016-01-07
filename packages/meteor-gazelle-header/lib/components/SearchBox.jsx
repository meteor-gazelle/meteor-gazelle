SearchBox = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    showButton: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      placeholder: null,
      showButton: false
    };
  },

  render () {
    const { placeholder, showButton } = this.props;

    return (
      <div className='search-box'>
        <input ref='input'
              className='search-box__input'
               type='search'
               placeholder={placeholder} />

        {showButton &&
          <button className='search-box__button' type='button'>
            Search
          </button>
        }
      </div>
    );
  }

});
