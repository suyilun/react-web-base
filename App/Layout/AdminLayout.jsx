import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminSideMenu from './AdminSideMenu';
import HeaderMenu from './HeaderMenu';
import * as Actions from '../Actions/Actions';

const { Header, Content, Sider } = Layout;

function mapStateToProps(state) {
  return { mainWindow: state.mainWindow };
}

// 默认头，底样式，待补充
class AdminLayout extends React.Component {
  static propTypes={
    dispatch: PropTypes.func,
    action: PropTypes.object,
    component: PropTypes.object,
    rest: PropTypes.object,
  };
  static defaultProps={
    dispatch: () => {},
    action: null,
    component: null,
    rest: null,
  };
  state = {
    collapsed: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const action = Actions.resizeWindow();
    dispatch(action);
    window.onresize = () => {
      // 加入redux
      dispatch(action);
    };
  }

  onCollapse=(collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const { component, rest } = this.props;
    const Component = component;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Header
              className="header"
            >
              <HeaderMenu />
            </Header>
            <Layout>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                style={
                  { height: `${window.innerHeight - 64}px` }
                }
              >
                <AdminSideMenu />
              </Sider>
              <Content>
                <Component
                  {...matchProps}
                />
              </Content>
            </Layout>
          </Layout>
        )}
      />);
  }
}
//  绑定组件名称
export default connect(mapStateToProps)(AdminLayout);
