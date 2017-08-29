import {Route} from 'react-router-dom'
import React from 'react'
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import {connect} from 'react-redux'
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;
import * as Actions from '../Actions/Actions';
require("./AppLayout.less")

function mapStateToProps(state) {
  return {mainWindow: state.mainWindow}
}

//默认头，底样式，待补充
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {dispatch} = this.props;
    let action = Actions.resizeWindow()
    dispatch(action);
    window.onresize = () => {
      dispatch(action)
      //加入redux
    }
  }

  render() {
    const {component,rest}=this.props;
    const Component=component
    return (
      <Route {...rest} render={matchProps => (
        <Layout>
          <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
              lineHeight: '64px'
            }}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider collapsible={true} style={{
              height: `${window.innerHeight - 64}px`
            }}></Sider>
            <Content>
              <Component {...matchProps}/>
            </Content>
          </Layout>
        </Layout>
      )}/>
    )
  }
}


 DefaultLayout=  connect(mapStateToProps)(DefaultLayout)

// const connect(mapStateToProps)(DefaultLayoutClzz)

// const DefaultLayout = ({
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route {...rest} render={matchProps => (
//       <Layout>
//         <Header className="header">
//           <div className="logo"/>
//           <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
//             lineHeight: '64px'
//           }}>
//             <Menu.Item key="1">nav 1</Menu.Item>
//             <Menu.Item key="2">nav 2</Menu.Item>
//             <Menu.Item key="3">nav 3</Menu.Item>
//           </Menu>
//         </Header>
//         <Layout>
//           <Sider collapsible={true} style={{
//             height: `${window.innerHeight - 64}px`
//           }}></Sider>
//           <Content>
//             <Component {...matchProps}/>
//           </Content>
//         </Layout>
//       </Layout>
//     )}/>
//   )
// };

//左右布局,具体样式待补充
const AdminLayout = ({
  component: Component,
  ...rest
}) => {
  return (
    <DefaultLayout {...rest} component={matchProps => (
      <div className="Post">
        <div className="Post-content">
          <Component {...matchProps}/>
        </div>
        <div className="Post-aside">
          <div>SomeSideBar</div>
        </div>
      </div>
    )}/>
  );
};

//单一布局
const IndexLayout = ({
  component: Component,
  ...rest
}) => {
  return (
    <DefaultLayout {...rest} component={matchProps => (
      <div className="Index">
        <div className="Index-content">
          <Component {...matchProps}/>
        </div>
      </div>
    )}/>
  );
}

module.exports = {
  AdminLayout,
  IndexLayout
}
