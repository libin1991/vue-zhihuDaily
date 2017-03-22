/**
 * 数据请求
 */
import axios from 'axios'
import api from './api'
import { isFunction } from '../utils/util'

/**
 * 获取数据
 * @param url
 * @param data
 * @param successCallback
 * @param errorCallback
 */
function getData(url, data, successCallback, errorCallback) {
    axios.get(url)
        .then((res) => {
            if (res.status === 200) {
                isFunction(successCallback) && successCallback(res.data);
            }
        })
        .catch((err) => {
            console.log();
            isFunction(errorCallback) && errorCallback(err);
        });
}

/**
 * 提交数据
 */
function postData() {
}

/**
 * 获取主题列表
 * @param successCallback
 * @param errorCallback
 */
function getThemes(successCallback, errorCallback) {
    getData(api.getThemes(), {}, successCallback, errorCallback);
}


/**
 * 获取最新日报列表
 * @param successCallback
 * @param errorCallback
 */
function getNewsLatest(successCallback, errorCallback) {
    getData(api.getLatestNews(), {}, successCallback, errorCallback);
}


/**
 * 获取最以往日报
 * @param {string} date 日期 yyyMMdd
 * @param successCallback
 * @param errorCallback
 */
function getBeforeNews(date, successCallback, errorCallback) {
    getData(api.getBeforeNews(date), {}, successCallback, errorCallback);
}

/**
 * 获取主题列表
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getThemeList(id, successCallback, errorCallback) {
    getData(api.getThemeList(id), {}, successCallback, errorCallback);
}


/**
 * 获取以往主题列表
 * @param themeId
 * @param lastId
 * @param successCallback
 * @param errorCallback
 */
function getBeforeThemeList(themeId, lastId, successCallback, errorCallback) {
    getData(api.getBeforeThemeList(themeId, lastId), {}, successCallback, errorCallback);
}

/**
 * 获取日报详情
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getNewDetail(id, successCallback, errorCallback) {
    getData(api.getNewDetail(id), {}, successCallback, errorCallback);

}


/**
 * 获取日报详情的额外信息
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getStoryExtraInfo(id, successCallback, errorCallback) {
    getData(api.getStoryExtraInfo(id), {}, successCallback, errorCallback);
}


/**
 * 获取主编列表
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getEditorList(id, successCallback, errorCallback) {
    getData(api.getThemeList(id), {}, successCallback, errorCallback);
}


/**
 * 获取主编详细信息
 * @param id
 * @param system
 * @param successCallback
 * @param errorCallback
 */
function getEditorDetail(id, system, successCallback, errorCallback) {
    getData(api.getEditorDetail(id, system), {}, successCallback, errorCallback);
}


/**
 * 获取栏目新闻
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getSectionNews(id, successCallback, errorCallback) {
    getData(api.getSectionNews(id), {}, successCallback, errorCallback);
}

/**
 * 获取栏目之前的新闻
 * @param id
 * @param timestamp
 * @param successCallback
 * @param errorCallback
 */
function getSectionBeforeNews(id, timestamp, successCallback, errorCallback) {
  getData(api.getSectionBeforeNews(id, timestamp), {}, successCallback, errorCallback);
}


/**
 * 获取长评论
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getLongComments(id, successCallback, errorCallback) {
    getData(api.getLongComments(id), {}, successCallback, errorCallback);
}

/**
 * 获取短评论
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getShortComments(id, successCallback, errorCallback) {
    getData(api.getShortComments(id), {}, successCallback, errorCallback);
}


/**
 * 获取之前短评论
 * @param id
 * @param successCallback
 * @param errorCallback
 */
function getBeforeShortComments(id, lastCommentsId,successCallback, errorCallback) {
    getData(api.getBeforeShortComments(id, lastCommentsId), {}, successCallback, errorCallback);
}

export default {
    getThemes,
    getNewsLatest,
    getBeforeNews,
    getThemeList,
    getBeforeThemeList,
    getNewDetail,
    getStoryExtraInfo,
    getEditorList,
    getEditorDetail,
    getSectionNews,
    getSectionBeforeNews,
    getLongComments,
    getShortComments,
    getBeforeShortComments,
};


