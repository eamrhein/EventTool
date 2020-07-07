const fetch = require("node-fetch");
const { parseForm } = require("./parseForm");
const baseurl = "https://www.eventbriteapi.com/v3";

// get a single account
const getAccount = async (apikey) => {
  return fetch(`${baseurl}/users/me?token=${apikey}`);
};
// fetch organization data
const getOrg = async (userId, apikey) => {
  return fetch(`${baseurl}/users/${userId}/organizations/?token=${apikey}`);
};

// resolve a response array into JSON
async function createEvent(data, apikey, id, locs) {
  try {
    let reqs = locs.map((loc) => {
      let { eventData } = parseForm(data, loc);
      return fetch(
        `https://www.eventbriteapi.com/v3/organizations/${id}/events/?token=${apikey}`,
        {
          method: "post",
          body: JSON.stringify(eventData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
    let resPromise = await Promise.all(reqs);
    let res = await Promise.all(
      resPromise.map(async (data) => await data.json())
    );
    if (!resPromise.every((promise) => promise.ok)) {
      res.forEach((error) => console.error(error.error_description));
      throw new Error("error creating events");
    }
    return res;
  } catch (error) {
    console.error(error.message);
  }
}

async function createSeries(id, data, apikey) {
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/events/${id}/schedules/?token=${apikey}`,
    {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    let error = await res.json();
    throw new Error(error.error_description);
  }
  const push = await res.json();
  return push;
}

async function createTicket(ticketData, ids, key) {
  let parsedTickets = ticketData.map((ticket) => {
    let stripped = ticket.price.replace(/[^0-9.-]+/g, "");
    var number = Number(stripped);
   let ticketObj;
    if (number > 0) {
      let costStr = stripped.replace(/./g, "");
      if (costStr.length < 4) {
        costStr = "0" + costStr;
      }
      console.log(costStr)
      ticketObj = {
        name: ticket.name,
        free: false,
        cost: `USD,${costStr}`,
        capacity: ticket.quantity,
      };
    } else {
      ticketObj = {
        name: ticket.name,
        free: true,
        capacity: ticket.quantity,
      };
    }
    return ticketObj
  })
  try {
    let ticketReq = ids.map((id) => {
      return parsedTickets.map((ticketObj) => {
        return fetch(
          `https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/?token=${key}`,
          {
            method: "POST",
            body: JSON.stringify({
              ticket_class: ticketObj,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
    })
    ticketPromiseGroups = await Promise.all(ticketReq.map(async(reqGroup) => await Promise.all(reqGroup)))
     let data = await Promise.all(ticketPromiseGroups.map(async(p) => {
       return await Promise.all(p.map(async(p) => await p.json()))
     }))
     
     return data
  } catch (error) {
    console.error(error)
  }
}
async function publishEvent(id, apikey) {
    const req = await fetch(
      `https://www.eventbriteapi.com/v3/events/${id}/publish/?token=${apikey}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  const res = await req.json()
  return res;
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
    throw new Error("Eventbrite API is not responding");
  }
  const account = await accountRes.json();
  const orgResponse = await getOrg(account.id, apikey);
  const orgsJson = await orgResponse.json();

  const organizations = orgsJson.organizations.map((obj) => {
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
    organizations,
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
const updateVenues = async (orgId, apikey, data) => {
  //url
  let url = `${baseurl}/organizations/${orgId}/venues/?token=${apikey}`;
  try {
    // find out which venues have already been created
    let existingVenuesReq = await fetch(url);
    let existingVenues = await existingVenuesReq.json();
    existingVenues = existingVenues.venues.map((obj) => obj.name);

    //find which submitted venues have not been created yet
    let newLocations = data.locations.filter(
      (obj) =>
        existingVenues.findIndex((venueName) => venueName === obj.City) === -1
    );

    //create new venues
    newLocations = newLocations.map((loc) => {
      return fetch(url, {
        method: "post",
        body: JSON.stringify({
          venue: {
            name: loc.City,
            address: {
              city: loc.City,
              region: loc.State,
              postal_code: loc.Postal,
            },
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    let createdVenueReqs = await Promise.all(newLocations);
    if (!createdVenueReqs.every((res) => res.ok)) {
      throw new Error("Error updating venue information");
    }
    // return venue ids for both newly created venues and already existing ones
    let updatedVenuesReq = await fetch(url);
    let updatedVenues = await updatedVenuesReq.json();
    updatedVenues = updatedVenues.venues.filter(
      (ven) => data.locations.findIndex((loc) => loc.City === ven.name) !== -1
    );
    updatedVenues = updatedVenues.map((ven) => {
      return {
        name: ven.name,
        id: ven.id,
        latitude: ven.latitude,
        longitude: ven.longitude,
      };
    });
    return updatedVenues;
  } catch (error) {
    console.error(error.message);
  }
};
const fetchVenues = async (orgId, apikey, continuationToken) => {
  let url = `${baseurl}/organizations/${orgId}/venues/?token=${apikey}`;
  if (continuationToken) {
    url += `&continuation=${continuationToken}`;
  }
  try {
    const pag = await fetch(url);
    const res = await pag.json();
    let venues = [];
    if (res.venues) {
      venues = res.venues.map(({ name, id }) => {
        return {
          name,
          id,
        };
      });
    }
    if (res.pagination && res.pagination.continuation) {
      const rest = await fetchVenues(
        orgId,
        apikey,
        res.pagination.continuationToken
      );
      return venues.concat(rest);
    }
    return venues;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchVenues,
  fetchAccount,
  createEvent,
  createSeries,
  updateVenues,
  createTicket,
  publishEvent,
  getUploadedUrl,
  getUploadSignature,
  uploadImage,
  fetchCategories,
  fetchSubCategories,
  fetchFormats,
};
