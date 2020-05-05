const fetch = require("node-fetch");

const baseurl = "https://www.eventbriteapi.com/v3";

// get a single account
const getAccount = async (apikey) => {
  return fetch(`${baseurl}/users/me?token=${apikey}`);
};
// fetch organization data
const getOrg = async (orgId, apikey) => {
  return fetch(`${baseurl}/users/${orgId}/organizations/?token=${apikey}`);
};
// resolve a resonse array into JSON

async function createEvent(data, apikey) {
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/organizations/64592771355/events/?token=${apikey}`,
    {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Event Data is Incomplete");
  }
  const resData = await res.json();
  return resData;
}

async function createSeries(id, occurrence_duration, recurrence_rule, apikey) {
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/events/${id}/schedules/?token=${apikey}`,
    {
      method: "post",
      body: JSON.stringify({
        schedule: {
          occurrence_duration,
          recurrence_rule,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
}

async function createTicket(id, cost, count, name, apikey) {
  let res;
  cost = parsePrice(cost);
  if (cost === "000") {
    res = await fetch(
      ` https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/?token=${apikey}`,
      {
        method: "post",
        body: JSON.stringify({
          ticket_class: {
            name,
            quantity_total: count,
            free: true,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    res = await fetch(
      ` https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/?token=${apikey}`,
      {
        method: "post",
        body: JSON.stringify({
          ticket_class: {
            name,
            quantity_total: count,
            cost: `USD, ${cost}`,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  if (!res.ok) {
    throw new Error("Ticket Info is Incorrect");
  }
  const data = await res.json();
  return data;
}
async function publishEvent(id, apikey) {
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/events/${id}/publish/?token=${apikey}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Could Not Publish Event");
  }
  return res.json();
}
async function getUploadSignature(apikey) {
  const fetchToken = await fetch(
    `https://www.eventbriteapi.com/v3/media/upload/?type=image-event-logo&token=${apikey}`
  );
  const data = await fetchToken.json();
  return data;
}

async function uploadImage(img, url, args) {
  const formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line guard-for-in
  for (const name in args) {
    formData.append(name, args[name]);
  }
  formData.append("file", img);
  try {
    const config = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getUploadedUrl(token) {
  try {
    const formData = new FormData();
    formData.append("upload_token", token);
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/media/upload/?token=${apikey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

// Graphql Endpoints
const fetchAccount = async (apikey) => {
  const accountRes = await getAccount(apikey);
  if (!accountRes.ok) {
    console.log(accountRes);
    throw new Error("Eventbrite API is not responding");
  }
  const account = await accountRes.json();
  const orgResponse = await getOrg(account.id, apikey);
  const orgsJson = await orgResponse.json();

  const orgs = orgsJson.organizations.map((obj) => {
    return {
      name: obj.name,
      id: obj.id,
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
    organizations: orgs,
  };
};
const fetchCategories = async (apikey, continuationToken) => {
  let url = `${baseurl}/categories/?token=${apikey}`;
  if (continuationToken) {
    url += `&continuation=${continuationToken}`;
  }
  const firstPage = await fetch(url);
  const res = await firstPage.json();
  const categories = res.categories.map(({ name, id }) => {
    return {
      name,
      id,
    };
  });

  if (res.pagination.continuation) {
    const rest = await fetchCategories(apikey, res.pagination.continuation);
    return categories.concat(rest);
  }
  return categories;
};

const fetchSubCategories = async (apikey, continuationToken) => {
  let url = `${baseurl}/subcategories/?token=${apikey}`;
  if (continuationToken) {
    url += `&continuation=${continuationToken}`;
  }
  const firstPage = await fetch(url);
  const res = await firstPage.json();
  const categories = res.subcategories.map(({ name, id, parent_category }) => {
    return {
      name,
      id,
      parent: parent_category.name,
    };
  });

  if (res.pagination.continuation) {
    const rest = await fetchSubCategories(apikey, res.pagination.continuation);
    return categories.concat(rest);
  }
  return categories;
};

const fetchFormats = async (apikey, continuationToken) => {
  let url = `${baseurl}/formats/?token=${apikey}`;
  if (continuationToken) {
    url += `&continuation=${continuationToken}`;
  }
  const firstPage = await fetch(url);
  const res = await firstPage.json();
  const types = res.formats.map(({ name, id }) => {
    return {
      name,
      id,
    };
  });

  if (res.pagination && res.pagination.continuation) {
    const rest = await fetchFormats(apikey, res.pagination.continuation);
    return types.concat(rest);
  }
  return types;
};
module.exports = {
  fetchAccount,
  createEvent,
  createSeries,
  createTicket,
  publishEvent,
  getUploadedUrl,
  getUploadSignature,
  uploadImage,
  fetchCategories,
  fetchSubCategories,
  fetchFormats,
};
