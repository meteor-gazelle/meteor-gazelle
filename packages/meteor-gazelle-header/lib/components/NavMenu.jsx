NavMenu = React.createClass({

  propTypes: {
    depth: React.PropTypes.number,
    maxDepth: React.PropTypes.number.isRequired,
    menu: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      depth: 1
    };
  },

  classNames() {
    const {depth} = this.props;
    return `main-nav__level${depth}`;
  },

  render() {
    const {depth, menu} = this.props;
    const classNames = this.classNames();

    return (
      <ul className={ classNames }>
        { menu.map(this.renderItem) }
      </ul>
      );
  },

  renderItem(item, index) {
    const {depth, maxDepth} = this.props;

    return (
      <NavItem key={ index } depth={ depth } maxDepth={ maxDepth } {...item} />
      );
  }

});
