/**
 * API 接口
 */

const API_BASE = '/zhihu/api';  // 代理 =>> 'http://news-at.zhihu.com/api'
const API_V4 = API_BASE + '/4';
const API_V3 = API_BASE + '/3';

const API_NEWS = API_V4 + '/news';
const API_STORY = API_V4 + '/story';


/**
 * 主题列表 API
 * @returns {string}
 */
function getThemes() {
    return API_V4 + '/themes';
}


/**
 * 最新日报 API
 * @returns {string}
 */
function getLatestNews() {
    return API_V4 + '/news/latest';
}


/**
 * 以往日报 API
 * 知乎日报最早20130519
 * @param {string} date 日期 yyyMMdd
 * @returns {string}
 */
function getBeforeNews(date) {
    return API_V4 + '/news/before/' + date;
}


/**
 * 获取主题列表 API
 * @param {Number} id 主题id
 * @returns {string}
 */
function getThemeList(id) {
    return API_V4 + '/theme/' + id;
}

/**
 * 获取以往主题列表 API
 * @param themeId
 * @param lastId
 * @returns {string}
 */
function getBeforeThemeList(themeId, lastId) {
    return API_V4 + '/theme/' + themeId + '/before/' + lastId;
}

/**
 * 获取日报详情 API
 * @param id
 */
function getNewDetail(id) {
    return API_V4 + '/news/' + id;
}


/**
 * 获取日报详情额外信息 API
 * @param id
 */
function getStoryExtraInfo(id) {
    return API_V4 + '/story-extra/' + id;
}


/**
 * 取主编详细信息 API
 * @param id
 * @param system
 * @returns {string}
 */
function getEditorDetail(id, system) {
    return API_V4 + '/editor/' + id + '/profile-page/' + system;
}


/**
 * 获取栏目新闻列表 API
 * @param id
 * @returns {string}
 */
function getSectionNews(id) {
   return API_V4 + '/section/' + id;
}


/**
 * 获取栏目之前新闻列表 API
 * @param id
 * @param timestamp
 * @returns {string}
 */
function getSectionBeforeNews(id, timestamp) {
    return API_V4 + '/section/' + id + '/before/' + timestamp;
}


/**
 * 获取长评论 API
 * @param id
 */
function getLongComments(id) {
    return API_V4 + '/story/' + id + '/long-comments'
}


/**
 * 获取长评论 API
 * @param id
 */
function getShortComments(id) {
    return API_V4 + '/story/' + id + '/short-comments'
}


/**
 * 获取长评论 API
 * @param id
 */
function getBeforeShortComments(id, lastCommentsId) {
  return API_V4 + '/story/' + id + '/short-comments/before/' + lastCommentsId
}


export default {
    getThemes,
    getLatestNews,
    getBeforeNews,
    getThemeList,
    getBeforeThemeList,
    getNewDetail,
    getStoryExtraInfo,
    getEditorDetail,
    getSectionNews,
    getSectionBeforeNews,
    getLongComments,
    getShortComments,
    getBeforeShortComments
};

