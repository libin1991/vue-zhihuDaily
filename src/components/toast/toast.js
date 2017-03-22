import Vue from 'vue';

const ToastConstructor = Vue.extend(require('./toast.vue'));

//保存实例池
let toastPool = [];
//获取实例
let getAnInstance = () => {
    //避免实例过多,有点单例么..
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

//保存实例
let returnAnInstance = (instance) => {
    if (instance) {
        toastPool.push(instance);
    }
};

/**
 * 删除 Toast DOM
 * @param {Object} instance 初始化的示例对象
 */
let removeDom = (instance) => {
    let $target = instance.$refs.toastContent.parentNode
    if ($target.parentNode) {
        $target.parentNode.removeChild($target)
    }

    instance.onCloseCallback && instance.onCloseCallback()
};

// 关闭弹窗
ToastConstructor.prototype.close = function() {
    if (!this.visible) {
        return
    }
    this.visible = false
    this.$refs.toastContent.addEventListener('transitionend', removeDom(this))  // @TODO: 运动未介绍就执行 removeDOM 了
    this.closed = true
    returnAnInstance(this)
};
/**
 * 自动关闭弹窗
 * @param {Object} instance 初始化的示例对象
 * @param {Number} duration 自动关闭的延时，单位毫秒
 */
ToastConstructor.prototype.autoClose = function(instance, duration) {
    instance.timer = setTimeout(function() {
        if (instance.closed) {
          return
        }
        instance.close()
    }, duration)
};
/**
 * 更新弹窗信息
 * @param {Object} options
*           {String}   content   提示信息
 *          {String}   icon      提示图标
 *          {Number}   duration  自动关闭的延时，单位毫秒
 *          {Function} onCloseCallback 关闭回调函数
 */
ToastConstructor.prototype.update = function(options) {
    this.content = options.content
    this.icon = options.icon
    options.onCloseCallback && (this.onCloseCallback = options.onCloseCallback)

    let duration = options.duration == undefined ? 2000 : options.duration;
    if (duration != 0) {
        this.autoClose(this, duration)
    }
};

/**
 * Toast 构造函数
 * @constructor
 * @param {Object} options
 *          {String}   content            提示信息. 默认: ''
 *          {String}   icon               提示图标. 默认: '' 取值 =>> success, fail, offline, loading,
 *          {Number}   duration           自动关闭的延时，单位毫秒. 默认: 2000. 为 0 时, Toast 不自动关闭
 *          {String}   className          Toast自定义 className. 默认: ''
 *          {String}   position           Toast显示位置. 默认: 'middle' 取值 =>> bottom, middle
 *          {Boolean}  overlay            是否显示遮罩层, 防止触摸穿透. 默认: true
 *          {Number}   overlayOpacity     遮罩层不透明度. 默认: 0  取值 => 0~1
 *          {String}   overlayBackground  遮罩层背景色. 默认: '#000'
 *          {Function} onCloseCallback    关闭回调函数. 默认: null
 *
 * https://haner199401.github.io/2016/07/08/vue-toast/
 * https://github.com/ElemeFE/vue-toast-mobile
 * 样式: https://mobile.ant.design/kitchen-sink/components/toast?lang=zh-CN
 */
let Toast = (options = {}) => {
    let duration = options.duration == undefined ? 2000 : options.duration;

    //获取实例对象
    let instance = getAnInstance()
    instance.closed = false
    clearTimeout(instance.timer)
    // 示例配置项
    instance.content = typeof options === 'string' ? options : options.content
    instance.className = options.className || ''
    instance.position = options.position || 'middle'
    instance.icon = options.icon || ''
    instance.overlay = options.overlay == undefined ? true : options.overlay
    instance.overlayOpacity = options.overlayOpacity || 0
    instance.overlayBackground = options.overlayBackground || '#000'
    instance.onCloseCallback = options.onCloseCallback || null

    document.body.appendChild(instance.$el)

    Vue.nextTick(function() {
        instance.visible = true
        instance.$refs.toastContent.removeEventListener('webkitTransitionEnd transitionend', removeDom);

        // 延迟时间不为 0, 执行自动关闭
        if (duration != 0) {
            instance.autoClose(instance, duration)
        }
    });

    return instance
};

export default Toast;