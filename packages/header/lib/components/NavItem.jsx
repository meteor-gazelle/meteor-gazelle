NavItem = React.createClass({

  propTypes: {
    children: React.PropTypes.array,
    depth: React.PropTypes.number.isRequired,
    maxDepth: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      children: null
    };
  },

  getInitialState () {
    return {
      animating: false,
      expanded: false
    };
  },

  onMouseOver () {
    this.setState({
      animating: true,
      expanded: true
    });
  },

  onMouseOut () {
    this.setState({
      expanded: false
    });
  },

  hasSubmenu () {
    const { children, depth, maxDepth } = this.props;
    return !!children && children.length > 0 && depth < maxDepth;
  },

  cssPrefix () {
    const { depth } = this.props;
    const prefix = `main-nav__level${depth}`;
    return prefix;
  },

  classNames () {
    const { animating, expanded } = this.state;
    const prefix = this.cssPrefix();
    const hasSubmenu = this.hasSubmenu();

    return classNames({
      [`${prefix}__item`]: true,
      [`${prefix}__item--animating`]: animating,
      [`${prefix}__item--expanded`]: expanded,
      [`${prefix}__item--submenu`]: hasSubmenu
    });
  },

  linkClassNames () {
    const prefix = this.cssPrefix();
    return `${prefix}__link`;
  },

  submenuClassNames () {
    const prefix = this.cssPrefix();
    return `${prefix}__submenu`;
  },

  render () {
    const { title, url } = this.props;
    const classNames = this.classNames();
    const linkClassNames = this.linkClassNames();

    return (
      <li className={ classNames } onMouseOver={ this.onMouseOver } onMouseOut={ this.onMouseOut }>
        <a className={ linkClassNames } href={ url }>
          { title }
        </a>
        { this.renderSubmenu() }
      </li>
      );
  },

  renderSubmenu () {
    const { children, depth, maxDepth } = this.props;
    const hasSubmenu = this.hasSubmenu();

    if (hasSubmenu) {
      const submenuClassNames = this.submenuClassNames();
      const submenuDepth = depth + 1;
      const submenuMaxDepth = maxDepth - 1;

      return (
        <div className={ submenuClassNames }>
          <NavMenu depth={ submenuDepth } maxDepth={ submenuMaxDepth } menu={ children } />
        </div>
        );
    }
  }

});
