import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_USER_ID: gql`
    query fetchUserId {
      userId @client
    }
  `,
  FETCH_USER: gql`
    query fetchUser($userId: ID!) {
      user(id: $userId) {
        id
        email
        accounts {
          id
          apikey
          email
          name
          first_name
          last_name
          image_id
          is_public
          organizations {
            name
            id
          }
        }
      }
    }
  `
};
