const base = require('./base');
const db = require('../utils/db');
const constants = require('../constants/index');

const urlFbGraphMessages = constants.urlFbGraphMessages;
const defaultHeaders = constants.defaultHeaders;
const payloadCategoryPrefix = constants.payloadCategoryPrefix;
const payloadCoursePrefix = constants.payloadCoursePrefix;
const payloadPagePrefix = constants.payloadPagePrefix;


/* Send category list to user */

const sendCategoriesPagination = async (senderId, datalist, parentId, page) => {
  if (!datalist.length) {
    base.sendMessage(senderId, 'Không tìm thấy!');
    return;
  }
  const pagesize = 10;
  const start = (page - 1) * pagesize;
  const min = Math.min(datalist.length, start + pagesize);
  await base.sendMessage(senderId, `Hiển thị ${start + 1} - ${min} trong số ${datalist.length} lĩnh vực:`);
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

  await base.postFetch(urlFbGraphMessages, defaultHeaders, body);

  if (page * pagesize < datalist.length) {
    await base.sendButtonPostback(senderId, 'Tải thêm lĩnh vực khác?', 'Xem thêm', `${payloadCategoryPrefix}${parentId || ''}_${payloadPagePrefix}${page + 1}`)
  }
}


/* Send parent category list to user */

const sendCategoriesParent = async (senderId, payload) => {
  const page = base.slicePage(payload) || 1;
  const list = await db('category')
    .whereNull('id_parent')
    .select('id', 'name');
  await sendCategoriesPagination(senderId, list, null, page)
}


/* Send child category list to user */

const sendCategoriesChild = async (senderId, payload) => {
  const parentId = base.sliceId(payload);
  const page = base.slicePage(payload) || 1;
  const list = await db('category')
    .whereNotNull('id_parent')
    .where({ id_parent: parentId })
    .select('id', 'name');
  await sendCategoriesPagination(senderId, list, parentId, page)
}


module.exports = {
  sendCategoriesParent,
  sendCategoriesChild
};