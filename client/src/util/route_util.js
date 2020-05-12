import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => {
  let { data, error } = useQuery(IS_LOGGED_IN);
  if (error) {
    return <p>Error</p>;
  }
  let { isLoggedIn } = data;
  if (routeType === "protected") {
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) =>
          isLoggedIn ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  } else {
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) =>
          !isLoggedIn ? <Component {...props} {...rest} /> : <Redirect to="/" />
        }
      />
    );
  }
};
export default AuthRoute;
