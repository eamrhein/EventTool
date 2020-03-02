const fetch = require("node-fetch");

const baseurl = "https://www.eventbriteapi.com/v3";

// EVENTBRITE API QUERY FRAMEWORK

// fetch Account Data with Array of ApiKeys
const getAccounts = async apiArray => {
  return Promise.all(
    apiArray.map(key => fetch(`${baseurl}/users/me?token=${key}`))
  );
};
// get a single account
const getAccount = async apikey => {
  return fetch(`${baseurl}/users/me?token=${apikey}`);
};
// fetch organization data
const getOrg = async (orgId, token) => {
  return fetch(`${baseurl}/users/${orgId}/organizations/?token=${token}`);
};
// resolve a resonse array into JSON
const resolveResponseData = async resArray => {
  return Promise.all(resArray.map(res => res.json()));
};

// Graphql Integration With EventBrite API
// Fetch and parse a single account
const fetchAccount = async apikey => {
  const accountRes = await getAccount(apikey);
  const account = await accountRes.json();
  const orgResponse = await getOrg(account.id, apikey);
  const orgsJson = await orgResponse.json();
  const orgs = orgsJson.organizations.map(obj => {
    return {
      name: obj.name,
      id: obj.id
    };
  });
  return {
    id: account.id,
    apikey,
    email: account.emails[0].email,
    first_name: account.first_name,
    last_name: account.last_name,
    name: account.name,
    image_id: account.image_id,
    organizations: orgs
  };
};
// Fetch and parse a multiple account
const fetchAccounts = async apikeys => {
  const accountsResponse = await getAccounts(apikeys);
  let acountsJson = await resolveResponseData(accountsResponse);
  acountsJson = acountsJson.map(async (account, idx) => {
    const orgResponse = await getOrg(account.id, apikeys[idx]);
    const orgsJson = await orgResponse.json();
    const orgs = orgsJson.organizations.map(obj => {
      return {
        name: obj.name,
        id: obj.id
      };
    });
    return {
      id: account.id,
      apikey: apikeys[idx],
      email: account.emails[0].email,
      first_name: account.first_name,
      last_name: account.last_name,
      name: account.name,
      image_id: account.image_id,
      organizations: orgs
    };
  });
  return acountsJson;
};
module.exports = { fetchAccounts, fetchAccount };
