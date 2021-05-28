const fetch = require('node-fetch');
const db = require('./db');

const accessToken = process.env.FBAPP_ACCESS_TOKEN;

// generate Facebook api urls with query params
const apiFbGraphProfile = 'https://graph.facebook.com/v2.6/me/messenger_profile';
const urlFbGraphProfile = new URL(apiFbGraphProfile);
urlFbGraphProfile.searchParams.append('access_token', accessToken);
const apiFbGraphMessages = 'https://graph.facebook.com/v2.6/me/messages';
const urlFbGraphMessages = new URL(apiFbGraphMessages);
urlFbGraphMessages.searchParams.append('access_token', accessToken);

const defaultHeaders = { 'Content-Type': 'application/json' };
const payloadSearch = 'SEARCH_COURSES';
const payloadCategories = 'CATEGORIES';
const payloadCategoryPrefix = 'CATEGORY_';
const defaultUrl = 'http://localhost';


/* Initialize and enable persistent menu on messenger chat box */

const postFetch = (url, headers, body) => {
  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
}


/* Initialize and enable persistent menu on messenger chat box */

const initPersistentMenu = _ => {
  try {
    const body = {
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: "postback",
              title: "Tìm kiếm khóa học",
              payload: payloadSearch
            },
            {
              type: "postback",
              title: "Danh mục khóa học",
              payload: payloadCategories
            },
          ]
        }
      ]
    };

    postFetch(urlFbGraphProfile, defaultHeaders, body);
  } catch (error) {
    console.error(error);
  }
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
              payload: payloadCategories
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}


/* Send category list to user */

const sendCategories = async senderId => {
  const list = await db('category').select('id', 'name');
  const listEls = list.map(item => ({
    title: "Các khóa học",
    buttons: [
      {
        title: item.name,
        type: "postback",
        payload: `${payloadCategoryPrefix}${item.id}`
      }
    ]
  }));
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "list",
          top_element_style: "compact",
          elements: listEls,
          buttons: [
            {
              title: "View More",
              type: "postback"
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}


/* Slice category id to id */

const sliceId = payload => {
  return +payload.split('_')[1]
}


/* Send course list to user */

const sendCourses = async (senderId, datalist) => {
  const listEls = datalist.map(item => ({
    title: item.name,
    subtitle: item.description,
    image_url: item.image_messenger,
    buttons: [
      {
        title: "Xem chi tiết",
        type: "web_url",
        url: item.url || defaultUrl,
      },
    ]
  }));
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "list",
          top_element_style: "compact",
          elements: listEls,
          buttons: [
            {
              title: "View More",
              type: "postback",
            }
          ]
        }
      }
    }
  };

  await postFetch(urlFbGraphMessages, defaultHeaders, body);
}

const sendCoursesByCategory = async (senderId, payload) => {
  const categoryId = sliceId(payload);
  const list = await db('course')
    .where({ id_category: categoryId })
    .select('id', 'name', 'description', 'image_messenger', 'url');

  await sendCourses(senderId, list);
}

const sendCoursesByKeyword = async (senderId, keyword) => {
  const list = await db('course')
    .where('name', 'like', `%${keyword}%`)
    .select('id', 'name', 'description', 'image_messenger', 'url');

    if(list.length){
      await sendCourses(senderId, list);
    }
    else {
      sendMessage(senderId, 'Không tìm thấy!');
      sendMenu(senderId);
    }
}


/*  */

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


/* Handle messaging */

const handleMessage = async entries => {
  try {
    for (let entry of entries) {
      const messaging = entry.messaging;
      for (let message of messaging) {
        const senderId = message.sender.id;

        console.log('message :>> ', message);
        // Check if user clicked a postback button or menu
        console.log('message.postback :>> ', message.postback);
        console.log('message.message :>> ', message.message);
        if (message.postback) {
          if (message.postback.payload) {
            const payload = message.postback.payload;

            if (payload !== payloadSearch) {
              await setSearchingState(senderId, false)
            }

            if (payload === payloadSearch) {
              sendMessage(senderId, 'Nhập tên khóa học: ');
              await setSearchingState(senderId, true);
            }
            else if (payload === payloadCategories) {
              sendMessage(senderId, 'Danh mục: ');
              await sendCategories(senderId);
            }
            else if (new RegExp(`^${payloadCategoryPrefix}(\\d+)$`).test(payload)) {
              sendCoursesByCategory(senderId, payload);
            }
            else {
              sendMenu(senderId);
            }
          }
        }

        else {
          if (message.message) {
            if (message.message.text) {
              console.log('message.message.text :>> ', message.message.text);
              const isSearching = await getSearchingState(senderId);
              console.log('isSearching :>> ', isSearching);
              const keyword = message.message.text;
              if (isSearching) {
                sendCoursesByKeyword(senderId, keyword);
              }
              else{
                sendMenu(senderId);
              }
              await setSearchingState(senderId, false)
            }
          }
        }

      }
    }

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  initPersistentMenu,
  handleMessage
};
