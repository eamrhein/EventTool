import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import WebFont from "webfontloader";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;



const cache = new InMemoryCache({
  dataIdFromObject: (object) => object._id || null,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
let devhost = window.location.hostname;
const gqlUri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : `http://${devhost}:5000/graphql`;

const httpLink = createHttpLink({
  uri: gqlUri,
  headers: {
    authorization: localStorage.getItem("auth-token"),
  },
});
const init = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
    maxSize: "4mb",
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
    resolvers: {},
  });
  const token = localStorage.getItem("auth-token");
  const userId = localStorage.getItem("userId");
  cache.writeData({
    data: {
      isLoggedIn: Boolean(token),
      userId: userId,
    },
  });

  if (token) {
    client
      .mutate({ mutation: VERIFY_USER, variables: { token } })
      .then(({ data }) => {
        cache.writeData({
          data: {
            isLoggedIn: data.verifyUser.loggedIn,
            userId: data.verifyUser.id,
          },
        });
      });
  }
  const Root = () => (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
  WebFont.load({
    google: {
      families: ["Playball", "Fira Sans", "Noto Sans"],
    },
  });
  ReactDOM.render(<Root />, document.getElementById("root"));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

document.addEventListener("DOMContentLoaded", (e) => {
  init();
});
