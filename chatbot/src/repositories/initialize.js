const base = require('./base');
const constants = require('../constants/index');

const urlFbGraphProfile = constants.urlFbGraphProfile;
const defaultHeaders = constants.defaultHeaders;
const payloadSearch = constants.payloadSearch;
const payloadCategoryPrefix = constants.payloadCategoryPrefix;
const payloadPagePrefix = constants.payloadPagePrefix;

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

    base.postFetch(urlFbGraphProfile, defaultHeaders, body);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  initPersistentMenu
}