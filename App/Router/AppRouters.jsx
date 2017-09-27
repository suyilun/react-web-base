import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router} from 'react-router-dom';
import { AdminLayout, IndexLayout } from '../Layout/';

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

const AdminRouter = () => (
  <Router>
    <AdminLayout />
  </Router>
);

module.exports = { AdminRouter };
