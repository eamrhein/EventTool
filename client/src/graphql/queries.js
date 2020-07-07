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
        apikeys
        jobs {
          id
          data
          status
          schedule
          urls
          eventbriteIds
        }
      }
    }
  `,
  FETCH_ACCOUNTS: gql`
    query fetchAccounts($apikeys: [String!]) {
      accounts(apikeys: $apikeys) {
        id
        first_name
        last_name
        apikey
        name
        email
        is_public
        image_id
        organizations {
          id
          name
        }
      }
    }
  `,
  FETCH_ACCOUNT: gql`
    query fetchAccount($apikey: String!) {
      account(apikey: $apikey) {
        id
        first_name
        last_name
        apikey
        name
        email
        is_public
        image_id
        organizations {
          id
          name
        }
      }
    }
  `,
  FETCH_VENUES: gql`
    query fetchVenues($apikey: String!, $orgId: String) {
      venues(apikey: $apikey, orgId: $orgId) {
        name
        id
      }
    }
  `,
  FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES: gql`
    query fetchCategories($apikey: String!) {
      categories(apikey: $apikey) {
        name
        id
      }
      subcategories(apikey: $apikey) {
        name
        id
        parent
      }
      types(apikey: $apikey) {
        name
        id
      }
      account(apikey: $apikey) {
        name
        organizations {
          id
          name
        }
      }
    }
  `,
};
