import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const AuthRoute = ({
  component: Component,
  path,
  exact,
  userId,
  routeType,
  responsive,
  ...rest
}) => {
  let { data, error } = useQuery(IS_LOGGED_IN);
  if (error) {
    return <p>{error.message}</p>;
  }
  let { isLoggedIn } = data;
  if (routeType === "protected") {
    return (
      <Route
        path={path}
        exact={exact}
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Component {...props} responsive={responsive} userId={userId} />
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
        {...rest}
        render={(props) =>
          !isLoggedIn ? <Component {...props} responsive={responsive} userId={userId} /> : <Redirect to="/" />
        }
      />
    );
  }
};
export default AuthRoute;
