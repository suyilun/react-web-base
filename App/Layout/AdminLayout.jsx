import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminSideMenu from './AdminSideMenu';
import HeaderMenu from './HeaderMenu';
import TaskJobEditor from '../Component/TaskJob/TaskJobEditor';
import TaskJob from '../Component/TaskJob/TaskJob';
import Home from '../Component/Home/Home';
import Ide from '../Component/Ide/Ide';
import * as Actions from '../Actions/Actions';

const { Header, Content, Sider } = Layout;

const Apps = () => (<div>Apps</div>);

const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};

// 默认头，底样式，待补充
class AdminLayout extends React.Component {
  static propTypes={
    dispatch: PropTypes.func,
    collapsed: PropTypes.bool,
    height: PropTypes.string,
  };
  static defaultProps={
    dispatch: () => {},
    collapsed: false,
    height: '500px',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const action = Actions.createLayoutChgHeightAct();
    dispatch(action);
    window.onresize = () => {
      dispatch(action);
    };
  }

  render() {
    const { collapsed, height } = this.props;
    return (
      <Layout>
        <Header className="header">
          <HeaderMenu />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsedChg) => {
              this.props.dispatch(Actions.createLayoutToggleSideMenuAct(collapsedChg));
            }}
            style={{ height }}
          >
            <AdminSideMenu />
          </Sider>
          <Content>
            <Breadcrumb.Item key="home">
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Switch>
              <Route path="/apps" component={Apps} />
              <Route path="/TaskJob" component={TaskJob} />
              <Route render={() => <div>Home Page</div>} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect((state) => ({...state.AdminLayout }))(AdminLayout));
