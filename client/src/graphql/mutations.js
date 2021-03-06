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
  PUBLISH_EVENT: gql`
  mutation publishEvent($id: ID!, $eventids: [ID!], $key: ID!, $dateStr: String!, $interval: Int) {
    publishEvent(id: $id, eventids: $eventids, key: $key, dateStr: $dateStr, interval: $interval) {
      status
      locked
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
        selectedKey
        jobs {
          data
          status
          schedule
        }
      }
    }
  `,
  DELETE_EVENT: gql`
    mutation deleteEvent($id: ID!){
      deleteEvent(id: $id){
        id
      }
    }
  `,
  DELETE_API_KEY: gql`
    mutation deleteAPIkey($id: ID!, $apikey: String!) {
      deleteAPIkey(id: $id, apikey: $apikey) {
        id
        email
        apikeys
        selectedKey
        jobs {
          data
          status
          schedule
        }
      }
    }
  `,
  SELECT_KEY: gql`
    mutation selectkey($key: String!, $userId: ID!) {
      selectKey(key: $key, userId: $userId){
        id,
        selectedKey
        apikeys
      }
    }
  `,
  SUBMIT_FORM: gql`
    mutation submitForm(
      $id: ID!
      $date: String!
      $data: String!
      $key: String!
    ) {
      scheduleEvent(id: $id, date: $date, data: $data, key: $key) {
        id
        email
        apikeys
        jobs {
          data
          status
          schedule
          urls
          locked
        }
      }
    }
  `,
};
