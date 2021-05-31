const moment = require('moment');
const base = require('./base');
const db = require('../utils/db');
const constants = require('../constants/index');

const urlFbGraphMessages = constants.urlFbGraphMessages;
const defaultHeaders = constants.defaultHeaders;
const payloadSearch = constants.payloadSearch;
const payloadCoursePrefix = constants.payloadCoursePrefix;
const payloadCourseDetailPrefix = constants.payloadCourseDetailPrefix;
const payloadPagePrefix = constants.payloadPagePrefix;

/* Send course list to user */

const sendCoursesPagination = async (senderId, datalist, page, payloadLoadMore) => {
  if (!datalist.length) {
    base.sendMessage(senderId, 'Không tìm thấy!');
    return;
  }
  const pagesize = 10;
  const start = (page - 1) * pagesize;
  const min = Math.min(datalist.length, start + pagesize);
  await base.sendMessage(senderId, `Hiển thị ${start + 1} - ${min} trong số ${datalist.length} khóa học:`);
  const pageList = [...datalist].splice(start, pagesize);

  const listEls = pageList.map(item => ({
    title: item.name,
    subtitle: item.description,
    image_url: item.image_messenger,
    buttons: [
      {
        type: "postback",
        title: "Xem chi tiết",
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
          template_type: "generic",
          elements: listEls
        }
      }
    }
  };

  await base.postFetch(urlFbGraphMessages, defaultHeaders, body);
  if (page * pagesize < datalist.length) {
    await base.sendButtonPostback(senderId, 'Tải thêm lĩnh vực khác?', 'Xem thêm', payloadLoadMore);
  }
}

const sendCoursesByCategory = async (senderId, payload) => {
  const categoryId = base.sliceId(payload);
  const page = base.slicePage(payload) || 1;
  const list = await db('course')
    .where({ id_category: categoryId })
    .select('id', 'name', 'description', 'image_messenger', 'url');

  const payloadLoadMore = `${payloadCoursePrefix}${categoryId || ''}_${payloadPagePrefix}${page + 1}`;
  await sendCoursesPagination(senderId, list, page, payloadLoadMore);
}

const sendCoursesByKeyword = async (senderId, payload) => {
  const keyword = base.sliceKw(payload);
  const page = base.slicePage(payload) || 1;
  const keywordPieces = keyword.trim().toLowerCase().replace(/\s+/g, "|");

  const list = await db('course')
    .whereRaw(`name_tsv @@ unaccent('${keywordPieces}')::tsquery`)
    .select('id', 'name', 'description', 'image_messenger', 'url');
  if (list.length) {
    const payloadLoadMore = `${payloadSearch}${keyword || ''}_${payloadPagePrefix}${page + 1}`;
    await sendCoursesPagination(senderId, list, page, payloadLoadMore);
  }
  else {
    await base.sendMessage(senderId, 'Không tìm thấy!');
    await base.sendMenu(senderId);
  }
}


/* Send course detail to user */

const sendCoursesDetail = async (senderId, payload) => {
  const courseId = base.sliceId(payload);
  const response = await db('course')
    .where({ id: courseId })
    .select('id', 'id_created_by', 'name', 'description', 'content', 'tutition', 'url'
      // 'is_completed', 'image_messenger', 
    );

  const detail = response[0];
  if (!detail) {
    await base.sendMessage(senderId, 'Không tồn tại!');
    return;
  }
  const promotions = await db('promotion')
    .where({ id_course: courseId })
    .select('id', 'price', 'description', 'time_begin', 'time_end');
  const tutitionFormatted = (detail.tutition || 0).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  await base.sendMessage(senderId, `Khóa học ${detail.name} chỉ với ${tutitionFormatted} đồng`);
  await base.sendMessage(senderId, detail.description);
  await base.sendMessage(senderId, detail.content);

  await promotions.forEach(async promo => {
    await base.sendMessage(senderId, `Khuyễn mãi giảm ${(detail.tutition - promo.price) / detail.tutition} từ ${moment(detail.time_begin).format('DD/MM/YYYY')} đến ${moment(detail.time_end).format('DD/MM/YYYY')}`);
  });

  await base.sendButtonUrl(senderId, 'Học online - xu thế 4.0', 'Tham gia ngay', detail.url);
}

module.exports = {
  sendCoursesByCategory,
  sendCoursesByKeyword,
  sendCoursesDetail
};