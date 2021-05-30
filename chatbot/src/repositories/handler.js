const base = require('./base');
const courseRepo = require('./course');
const categoryRepo = require('./category');
const constants = require('../constants/index');

const payloadSearch = constants.payloadSearch;
const payloadCategoryPrefix = constants.payloadCategoryPrefix;
const payloadCoursePrefix = constants.payloadCoursePrefix;
const payloadCourseDetailPrefix = constants.payloadCourseDetailPrefix;
const payloadPagePrefix = constants.payloadPagePrefix;


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
              base.setSearchingState(senderId, false)
            }
            if (payload === payloadSearch) {
              await base.sendMessage(senderId, 'Nhập tên khóa học: ');
              await base.setSearchingState(senderId, true);
            }
            else if (new RegExp(`^${payloadSearch}([^_]+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await courseRepo.sendCoursesByKeyword(senderId, payload);
            }
            else if (new RegExp(`^${payloadCategoryPrefix}_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await categoryRepo.sendCategoriesParent(senderId, payload);
            }
            else if (new RegExp(`^${payloadCategoryPrefix}(\\d+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await categoryRepo.sendCategoriesChild(senderId, payload);
            }
            else if (new RegExp(`^${payloadCoursePrefix}(\\d+)_${payloadPagePrefix}(\\d+)$`).test(payload)) {
              await courseRepo.sendCoursesByCategory(senderId, payload);
            }
            else if (new RegExp(`^${payloadCourseDetailPrefix}(\\d+)$`).test(payload)) {
              await courseRepo.sendCoursesDetail(senderId, payload);
            }
            else {
              await base.sendMenu(senderId);
            }
          }
        }

        else {
          if (message.message) {
            if (message.message.text) {
              const isSearching = await base.getSearchingState(senderId);
              const keyword = message.message.text;
              if (isSearching) {
                await courseRepo.sendCoursesByKeyword(senderId, `_${keyword}`);
              }
              else {
                await base.sendMenu(senderId);
              }
              await base.setSearchingState(senderId, false)
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
  handleMessage
};