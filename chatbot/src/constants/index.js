const defaultPort = 5000;
const accessToken = process.env.FBAPP_ACCESS_TOKEN;
const verifyToken = process.env.FBAPP_VERIFY_TOKEN;

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
const webUrl = 'https://oawebapp.herokuapp.com/'

module.exports = {
  defaultPort,
  verifyToken,
  accessToken,
  urlFbGraphProfile,
  urlFbGraphMessages,
  defaultHeaders,
  payloadSearch,
  payloadCategoryPrefix,
  payloadCoursePrefix,
  payloadCourseDetailPrefix,
  payloadPagePrefix,
  webUrl
}