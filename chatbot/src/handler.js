
const request = require('request');

const fbGraphProfile = 'https://graph.facebook.com/v2.6/me/messenger_profile';
const fbGraphMessages = 'https://graph.facebook.com/v2.6/me/messages';
const accessToken = process.env.FBAPP_ACCESS_TOKEN;
const payloadMenuSearch = 'SEARCH_COURSES';
const payloadCategories = 'CATEGORIES';


/* Initialize and enable persistent menu on messenger chat box */

const initPersistentMenu = _ => {
  const body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Tìm kiếm khóa học",
            payload: payloadMenuSearch
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

  request({
    url: fbGraphProfile,
    qs: {
      access_token: accessToken,
    },
    method: "POST",
    json: body
  });
}


/* Send single message to user */

const sendMessage = (senderId, message) => {
  const body = {
    recipient: {
      id: senderId
    },
    message: {
      text: message
    }
  };

  request({
    url: fbGraphMessages,
    qs: {
      access_token: accessToken,
    },
    method: 'POST',
    json: body
  });
}


/* Send menu to user */

const sendMenu = senderId => {
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
              payload: payloadCategories
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

  request({
    url: fbGraphMessages,
    qs: {
      access_token: accessToken,
    },
    method: 'POST',
    json: body
  });
}


/* Send category list to user */

const sendCategories = senderId => {
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
          elements: [
            {
              title: "Các khóa học",
              buttons: [
                {
                  title: "Làm giàu",
                  type: "postback",
                  payload: "payload"
                }
              ]
            },
            {
              title: "Các khóa học",
              buttons: [
                {
                  title: "Lập trình",
                  type: "postback",
                  payload: "payload"
                }
              ]
            },
          ],
          buttons: [
            {
              title: "View More",
              type: "postback",
              payload: "payload"
            }
          ]
        }
      }
    }
  };

  request({
    url: fbGraphMessages,
    qs: {
      access_token: accessToken,
    },
    method: 'POST',
    json: body
  });
}


/* Send course list to user */

const sendCourses = (senderId, ) => {
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
          elements: [
            {
              title: "Học kinh doanh từ con số 0",
              subtitle: "Thánh lùa gà",
              image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU",
              buttons: [
                {
                  title: "Tham gia ngay",
                  type: "web_url",
                  url: "http://localhost",
                },
              ]
            },
            {
              title: "Học kinh doanh từ con số 0",
              subtitle: "Thánh lùa gà",
              image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU",

              buttons: [
                {
                  title: "Tham gia ngay",
                  type: "web_url",
                  url: "http://localhost",
                },
              ]
            },
          ],
          buttons: [
            {
              title: "View More",
              type: "postback",
              payload: "payload"
            }
          ]
        }
      }
    }
  };

  request({
    url: fbGraphMessages,
    qs: {
      access_token: accessToken,
    },
    method: 'POST',
    json: body
  });
}


const handleMessage = entries => {
  for (let entry of entries) {
    const messaging = entry.messaging;
    for (let message of messaging) {
      const senderId = message.sender.id;
      console.log('message :>> ', message);

      // Check if user clicked a postback button or menu
      if (message.postback) {        
        if (message.postback.payload) {
          const payload = message.postback.payload;
          console.log('message.postback.payload :>> ', payload);
          if (payload === payloadCategories) {
            sendMessage(senderId, 'Danh mục: ');
            sendCategories(senderId);
          }
          else if (payload === payloadMenuSearch) {
            sendMessage(senderId, 'Nhập tên khóa học: ');
          }
          else if (payload === 'payload') {
            sendCourses(senderId, ': ');
          }
          else {
            sendMenu(senderId);
          }
        }
      }
      else{
        if (message.message) {
          if (message.message.text) {
            sendMenu(senderId);
          }
        }
      }
    }
  }
}

module.exports = {
  initPersistentMenu,
  handleMessage
};
