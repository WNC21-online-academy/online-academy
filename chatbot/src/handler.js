const moment = require('moment');
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
const payloadSearch = 'SEARCHCOURSES_';
const payloadCategoryPrefix = 'CATEGORIESBY_';
const payloadCoursePrefix = 'COURSESBY_';
const payloadCourseDetailPrefix = 'COURSESDETAIL_';
const payloadPagePrefix = 'PAGE_';


/* Initialize and enable persistent menu on messenger chat box */

const postFetch = async (url, headers, body) => {
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
}


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
              payload: `${payloadCategoryPrefix}_${payloadPagePrefix}1`
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


/* Send category list to user */

const sendCategoriesPagination = async (senderId, datalist, parentId, page) => {
  const pagesize = 10;
  const start = (page - 1) * pagesize;
  const min = Math.min(datalist.length, start + pagesize);
  await sendMessage(senderId, `Hiển thị ${start + 1} - ${min} trong số ${datalist.length} lĩnh vực:`);
  const pageList = [...datalist].splice(start, pagesize);

  const listEls = pageList.map(item => ({
    title: item.name,
    buttons: [
      {
        title: parentId ? "Các khóa học" : "Xem chi tiết",
        type: "postback",
        payload: `${parentId ? payloadCoursePrefix : payloadCategoryPrefix}${item.id}_${payloadPagePrefix}1`
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

  if (page * pagesize < datalist.length) {
    await sendButtonPostback(senderId, 'Tải thêm lĩnh vực khác?', 'Xem thêm', `${payloadCategoryPrefix}${parentId || ''}_${payloadPagePrefix}${page + 1}`)
  }
}

/* Send parent category list to user */

const sendCategoriesParent = async (senderId, payload) => {
  const page = slicePage(payload) || 1;
  const list = await db('category')
    .whereNull('id_parent')
    .select('id', 'name');
  await sendCategoriesPagination(senderId, list, null, page)
}

/* Send child category list to user */

const sendCategoriesChild = async (senderId, payload) => {
  const parentId = sliceId(payload);
  const page = slicePage(payload) || 1;
  const list = await db('category')
    .whereNotNull('id_parent')
    .where({ id_parent: parentId })
    .select('id', 'name');
  await sendCategoriesPagination(senderId, list, parentId, page)
}


/* Send course list to user */

const sendCoursesPagination = async (senderId, datalist, page) => {
  const pagesize = 10;
  const start = (page - 1) * pagesize;
  const min = Math.min(datalist.length, start + pagesize);
  await sendMessage(senderId, `Hiển thị ${start + 1} - ${min} trong số ${datalist.length} khóa học:`);
  const pageList = [...datalist].splice(start, pagesize);

  const listEls = pageList.map(item => ({
    title: item.name,
    subtitle: item.description,
    image_url: item.image_messenger,
    buttons: [
      {
        title: "Xem chi tiết",
        type: "postback",
        payload: `${payloadCourseDetailPrefix}${item.id}`
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
  const page = slicePage(payload) || 1;
  const list = await db('course')
    .where({ id_category: categoryId })
    .select('id', 'name', 'description', 'image_messenger', 'url');

  await sendCoursesPagination(senderId, list, page);
}

const sendCoursesByKeyword = async (senderId, payload) => {
  const keyword = sliceKw(payload);
  const page = slicePage(payload) || 1;
  const list = await db('course')
    .where('name', 'like', `%${keyword}%`)
    .select('id', 'name', 'description', 'image_messenger', 'url');

  if (list.length) {
    await sendCoursesPagination(senderId, list, page);
  }
  else {
    sendMessage(senderId, 'Không tìm thấy!');
    sendMenu(senderId);
  }
}


/* Send course detail to user */

const sendCoursesDetail = async (senderId, payload) => {
  const courseId = sliceId(payload);
  const response = await db('course')
    .where({ id: courseId })
    .select('id', 'id_created_by', 'name', 'description', 'content', 'tutition', 'url'
      // 'is_completed', 'image_messenger', 
    );

  const detail = response[0];
  if (!detail) {
    sendMessage(senderId, 'Không tồn tại!');
    return;
  }
  const promotions = await db('promotion')
    .where({ id_course: courseId })
    .select('id', 'price', 'description', 'time_begin', 'time_end');
  const tutitionFormatted = (detail.tutition || 0).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  await sendMessage(senderId, `Khóa học ${detail.name} chỉ với ${tutitionFormatted} đồng`);
  await sendMessage(senderId, detail.description);
  await sendMessage(senderId, detail.content);

  await promotions.forEach(async promo => {
    await sendMessage(senderId, `Khuyễn mãi giảm ${(detail.tutition - promo.price) / detail.tutition} từ ${moment(detail.time_begin).format('DD/MM/YYYY')} đến ${moment(detail.time_end).format('DD/MM/YYYY')}`);
  });

  await sendButtonUrl(senderId, 'Học online - xu thế 4.0', 'Tham gia ngay', detail.url);
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


/* Handle messaging */

const handleMessage = async entries => {
  try {
    for (let entry of entries) {
      const messaging = entry.messaging;
      for (let message of messaging) {
        const senderId = message.sender.id;

        // Check if user clicked a postback button or menu
        if (message.postback) {
          if (message.postback.payload) {
            const payload = message.postback.payload;

            if (payload !== payloadSearch) {
              setSearchingState(senderId, false)
            }
            if (payload === payloadSearch) {
              await sendMessage(senderId, 'Nhập tên khóa học: ');
              await setSearchingState(senderId, true);
            }
            else if (new RegExp(`^${payloadSearch}(\\S+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await sendCoursesByKeyword(senderId, payload);
            }
            else if (new RegExp(`^${payloadCategoryPrefix}_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await sendCategoriesParent(senderId, payload);
            }
            else if (new RegExp(`^${payloadCategoryPrefix}(\\d+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await sendCategoriesChild(senderId, payload);
            }
            else if (new RegExp(`^${payloadCoursePrefix}(\\d+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await sendCoursesByCategory(senderId, payload);
            }
            else if (new RegExp(`^${payloadCourseDetailPrefix}(\\d+)$`).test(payload)) {
              await sendCoursesDetail(senderId, payload);
            }
            else {
              await sendMenu(senderId);
            }
          }
        }

        else {
          if (message.message) {
            if (message.message.text) {
              const isSearching = await getSearchingState(senderId);
              const keyword = message.message.text;
              if (isSearching) {
                await sendCoursesByKeyword(senderId, `_${keyword}`);
              }
              else {
                await sendMenu(senderId);
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