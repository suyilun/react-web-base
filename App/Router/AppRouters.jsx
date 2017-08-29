// import { Route} from 'react-router';
import {
  HashRouter as Router,
  BrowserRouter,
  Switch,
  Link,
  Route,
  Redirect
} from 'react-router-dom';
import {AdminLayout, IndexLayout} from "../Layout/AppLayouts.jsx";
import Home from "../Component/Home/Home.jsx";
import React from 'react';

//类似frame模板
const AdminRouter = () => (
  <Router>
    <Switch>
      <AdminLayout path="/home" component={Home}/>
      <IndexLayout exact path='/' component={Home}/>
      <Route path="/tacos" component={Tacos}/>
    </Switch>
  </Router>
)

//单页模板
const SimpleRouter = () => {
  return (
    <Router forceRefresh={false}></Router>
  );
}

const Tacos = ({match}) => {
  console.log("Tacos url ", match.url)(
    <div>
      <Redirect to="/home"/>
    </div>
  )
}

module.exports = {
  AdminRouter,
  SimpleRouter
};
