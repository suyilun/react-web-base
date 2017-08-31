import React from 'react';
import PropTypes from 'prop-types';

//  单一布局
class IndexLayout extends React.Component {
  static propTypes={
    dispatch: PropTypes.requiredFunc,
    action: PropTypes.requiredFunc,
    component: PropTypes.node,
    rest: PropTypes.object,
  };
  static defaultProps={
    dispatch: () => {},
    action: null,
    component: null,
    rest: null,
  };
  render() {
    const { component, rest } = this.props;
    const Component = component;
    return (
      <div
        {...rest}
        component={matchProps => (
          <div className="Index">
            <div className="Index-content">
              <Component {...matchProps} />
            </div>
          </div>
        )}
      />
    );
  }
}

export default IndexLayout;
