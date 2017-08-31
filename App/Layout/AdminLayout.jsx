import React from 'react';
import { Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftSideMenu from './LeftSideMenu';
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
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={
                  { lineHeight: '64px' }
                }
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
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
                <LeftSideMenu />
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
