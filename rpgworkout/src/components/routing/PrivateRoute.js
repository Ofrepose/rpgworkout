import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Route, Redirect } from 'react-router-dom';

// ...rest takes anything else that is passed in
const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading },  ...rest }) => (
  <Route {...rest}
  render={props => !isAuthenticated ? (<Redirect to='/' />) :
    (<Component {...props} />) }

  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
