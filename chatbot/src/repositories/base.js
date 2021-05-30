const fetch = require('node-fetch');
const db = require('../utils/db');
const constants = require('../constants/index');
const urlFbGraphMessages = constants.urlFbGraphMessages;
const defaultHeaders = constants.defaultHeaders;
const payloadSearch = constants.payloadSearch;
const payloadCategoryPrefix = constants.payloadCategoryPrefix;
const payloadPagePrefix = constants.payloadPagePrefix;

/* Slice payload(category or course) id to id */

const sliceId = payload => {
  return +payload.split('_')[1]
}

/* Slice payload(category or course) pagination to page */

const slicePage = payload => {
  return +payload.split('_')[3]
}


/* Slice payload(category or course) id to id */

const sliceKw = payload => {
  return payload.split('_')[1]
}


/* Initialize and enable persistent menu on messenger chat box */

const postFetch = async (url, headers, body) => {
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
}


/* Send single message to user */

const sendMessage = async (senderId, message) => {
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      text: message
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}


/* Send single button to user */

const sendButtonPostback = async (senderId, text, title, payload) => {
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text,
          buttons: [
            {
              type: "postback",
              title,
              payload
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}

const sendButtonUrl = async (senderId, text, title, url) => {
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text,
          buttons: [
            {
              type: "web_url",
              url: url || "http://localhost.com",
              title
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}


/* Send menu to user */

const sendMenu = async senderId => {
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Có phải bạn muốn ",
          buttons: [
            {
              type: "postback",
              title: "Tìm kiếm khóa học",
              payload: payloadSearch
            },
            {
              type: "postback",
              title: "Danh mục khóa học",
              payload: `${payloadCategoryPrefix}_${payloadPagePrefix}1`
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}


/* Handle searching */

const getSearchingState = async (fbUserId) => {
  const doc = await db('state').where({
    id_fb_user: fbUserId
  })
    .select('is_searching')

  let isSearching = false;
  if (doc[0]) {
    const is_searching = doc[0].is_searching;
    isSearching = is_searching;
  }
  return isSearching;
}

/*  */

const setSearchingState = async (fbUserId, isSeartching) => {
  await db('state').insert({
    id_fb_user: fbUserId,
    is_searching: !!isSeartching
  })
    .onConflict("id_fb_user")
    .merge()
    .returning("*");
}


module.exports = {
  postFetch,
  getSearchingState,
  setSearchingState,
  sendMessage,
  sendMenu,
  sendButtonPostback,
  sendButtonUrl,
  sliceId,
  slicePage,
  sliceKw
}