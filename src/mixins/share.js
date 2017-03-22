/**
 * Created by 方雨 on 2017/3/1.
 * 分享
 */
import {browser} from '../utils/util'

export default {
    data() {
        return {
            isShowActionSheetShare: false,    // 是否显示分享列表 弹窗
            isShowPopupShareToWechat: false,  // 是否显示分享到微信 Popup 弹窗
            isShowActionSheetShareToWechat: false,  // 是否显示分享到微信 AvtionSheet 弹窗
        }
    },
    props: {
        titleText: {
            type: String,
            default: '分享到'
        },
        shareUrl: {
            type: String,
            default: ''
        },
        shareTitle: {
            type: String,
            default: ''
        },
        shareContent: {
            type: String,
            default: ''
        },
        shareImage: {
            type: String,
            default: ''
        }
    },
    methods: {
        showActionSheetShareHandler() {
            //console.log('mixin share =>> 显示分享弹窗')
            this.isShowActionSheetShare = true
        },
        hideActionSheetShare() {
            //console.log('mixin share =>> 隐藏分享弹窗')
            this.isShowActionSheetShare = false
        },
        showActionSheetShareToWechat() {
            this.isShowActionSheetShareToWechat = true
        },
        hideActionSheetShareToWechat() {
            this.isShowActionSheetShareToWechat = false
        },
        showPopupShareToWechat() {
           this.isShowPopupShareToWechat = true
        },
        hidePopupShareToWechat() {
            this.isShowPopupShareToWechat = false
        },
        // 新浪微博
        shareToSina() {
            const URL = 'http://service.weibo.com/share/share.php?url='+ this.shareUrl + '&title=' + this.shareContent + '&appkey=&pic=' + this.shareImage
            this.shareTo(URL)
        },
        // 腾讯微博
        shareToQt() {
        },
        // QQ 空间
        shareToQzone() {
            const URL = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ this.shareUrl + '&title=' + this.shareContent + '&desc=&summary=&site=&pics=' + this.shareImage
            this.shareTo(URL)
        },
        // QQ 好友
        shareToQQ() {
            const URL = 'https://connect.qq.com/widget/shareqq/index.html?url='+ this.shareUrl + '&title=' + this.shareContent + '&desc=&summary=&site=&pics=' + this.shareImage
            this.shareTo(URL)
        },
        // 微信
        shareToWechat() {
            // console.log('分享到微信')
            this.hideActionSheetShare()

            if (browser.info.mobile) {
                this.showActionSheetShareToWechat()
            } else {
                this.showPopupShareToWechat()
            }
        },
        shareTo(url) {
            const NEW_WINDOW = window.open('about:blank');
            NEW_WINDOW.location.href = url;
        }
    }
}
