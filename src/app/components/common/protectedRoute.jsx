import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/register",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default ProtectedRoute;
