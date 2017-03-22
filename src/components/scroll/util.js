/**
 * Created by 方雨 on 2017/2/14.
 */

/**
 * 获取滚动条滚动高度
 * @returns {number}
 */
function getScrollTop(element) {
    if (element) {
        return element.scrollTop
    } else {
        return document.documentElement.scrollTop || document.body.scrollTop
    }
}


/**
 * 获取可视区域高度
 * @param element
 * @returns {number}
 */
function getClientHeight(element) {
    if (element) {
        return element.clientHeight
    } else {
        return document.documentElement.clientHeight
    }
}


/**
 * 获取滚动区域高度信息
 * @param element
 * @returns {number}
 */
function getScrollHeight(element) {
    if (element) {
      return element.scrollHeight
    } else {
      return document.documentElement.scrollHeight
    }
}


export {
    getScrollTop,
    getClientHeight,
    getScrollHeight,
}