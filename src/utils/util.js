
/**
 * 获取浏览器相关信息
 * @type {{info: {mobile, android, ios, iPhone, iPad, weixin, qq}, language: string}}
 */
const browser = {
    info: function(){
        const UA = navigator.userAgent;
        return {
            mobile: !!UA.match(/AppleWebKit.*Mobile.*/),                  //是否为移动终端
            android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1, //android终端
            ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),             //ios终端
            iPhone: UA.indexOf('iPhone') > -1 ,        //是否为iPhone或者QQHD浏览器
            iPad: UA.indexOf('iPad') > -1,             //是否iPad
            weixin: UA.indexOf('MicroMessenger') > -1, //是否微信浏览器
            qq: UA.match(/\sQQ/i) == 'qq',             //是否QQ浏览器
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};


/**
 * 图片加载失败修复
 * @param url
 */
function imageUrlPrefix(value) {
    const prefix = 'http://zhihu.garychang.cn/tiny-pic?img='  // https://images.weserv.nl/?url=
    return prefix + value
}

/**
 * 判断目标是否是函数
 * @param val
 * @returns {boolean}
 */
function isFunction(target) {
    return typeof target === 'function';
}


/**
 * 把换行符转换成 HTML 换行标签
 * @param content
 */
function formatWrapToHtml(content) {
    return content.replace(/\n/gi, '<br />')
}


//滚动条函数封装
// tar_y 即滑动条顶端 距离页面最上面的距离
function scrollTo(tar_y) {
    var timer = setTimeout(function(){
        var current_y = document.body.scrollTop,
        //console.log(current_y)
        step = 40 //步长系数 即剩余的距离除以40 每1ms 移动一段距离
        if (tar_y>current_y){ //tar_y > current_y 即向下滚动
            var dist = Math.ceil((tar_y-current_y)/step)
            var next_y = current_y+dist
            if(next_y<tar_y){  //向上滚动和向下滚动判定的区别 是这里！！
                window.scrollTo(0,next_y)
                scrollTo(tar_y)
                console.log('向下')
            }
            else{
                window.scrollTo(0,tar_y)
                //clearTimeout(timer)
            }
        }
        else{ //tar_y < current_y 即向上滚动
            var dist = Math.floor((tar_y-current_y)/step)
            var next_y = current_y+dist
            if(next_y>tar_y){
                window.scrollTo(0,next_y)
                scrollTo(tar_y)
                console.log('向上')
            }
            else{
                window.scrollTo(0,tar_y)
                //clearInterval(timer)
            }
        }
    },1)
}

export {
    browser,
    isFunction,
    imageUrlPrefix,
    formatWrapToHtml,
    scrollTo
};
