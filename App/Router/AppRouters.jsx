import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AdminLayout, IndexLayout } from '../Layout/';
import Home from '../Component/Home/Home';
import Ide from '../Component/Ide/Ide';
import Console from '../Console/Console';


const Tacos = ({ match }) => {
  /*  eslint no-console: "error" */
  Console.log('match ', match);
  Console.log(' Tacos url ', match.url);
  return (
    <div>
      <Redirect to="/home" />
    </div>
  );
};

Tacos.propTypes = { match: PropTypes.string };
Tacos.defaultProps = { match: null };

// 类似frame模板
const AdminRouter = () => (
  <Router>
    <Switch>
      <AdminLayout path="/home" component={Home} />
      <AdminLayout path="/Ide" component={Ide} />
      <IndexLayout exact path="/" component={Home} />
      <Route path="/tacos" component={Tacos} />
    </Switch>
  </Router>
);

module.exports = { AdminRouter };
