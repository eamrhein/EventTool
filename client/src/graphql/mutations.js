import gql from "graphql-tag";
export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        token
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        id
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        id
        loggedIn
      }
    }
  `,
  PUSH_API_KEY: gql`
    mutation pushAPIkey($id: ID!, $apikey: String!) {
      pushAPIkey(id: $id, apikey: $apikey) {
        id
        email
        apikeys
      }
    }
  `,
  DELETE_API_KEY: gql`
    mutation deleteAPIkey($id: ID!, $apikey: String!) {
      deleteAPIkey(id: $id, apikey: $apikey) {
        id
        email
        apikeys
      }
    }
  `,
};
