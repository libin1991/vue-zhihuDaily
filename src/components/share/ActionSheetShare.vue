<template>
    <div class="share">
        <action-sheet :titleText="titleText" :open="isShowActionSheetShare" @hideHandler="hideActionSheetShare">
            <div class="share-list">
                <div class="share-list__item" @click="share(item.click)" v-for="(item, index) in actionLists">
                    <div class="social-icon"><img :src="item.icon" /></div>
                    <div class="social-name">{{item.name}}</div>
                </div>
            </div>
        </action-sheet>

        <action-sheet titleText="长按复制下方链接，去粘贴给好友吧" :open="isShowActionSheetShareToWechat" @hideHandler="hideActionSheetShareToWechat">
            <div class="share-copytip">{{shareUrl}}</div>
        </action-sheet>

        <popup :open="isShowPopupShareToWechat" @hideHandler="hidePopupShareToWechat">
            <div class="share-wechat">
                <div class="share-wechat__title">分享到微信朋友圈</div>
                <div class="share-wechat__content">
                    <qrcode :value="shareUrl" :size="200"></qrcode>
                    <p class="share-wechat__tip">打开微信，点击底部的“发现”，<br />使用“扫一扫”即可将网页分享至朋友圈。</p>
                </div>
            </div>
        </popup>

    </div>
</template>

<script>
import Qrcode from 'v-qrcode'
import ActionSheet from '../ActionSheet'
import Popup from '../popup/Popup'

import shareMixin from '../../mixins/share'

import iconShareQQ from '../../assets/icon-share-qq.png'
import iconShareQzone from '../../assets/icon-share-qzone.png'
import iconShareWechat from '../../assets/icon-share-wechat.png'
import iconShareSina from '../../assets/icon-share-sina.png'

export default {
    name: 'actionSheetShare',
    mixins: [shareMixin],
    data() {
        return {
            actionLists: [
                {
                    name: '新浪微博',
                    icon: iconShareSina,
                    click:() => {
                        console.log('分享到新浪微博')
                        this.shareToSina()
                    }
                },
                {
                    name: '微信朋友圈',
                    icon: iconShareWechat,
                    click:() => {
                        this.shareToWechat()
                    }
                },
                {
                    name: 'QQ空间',
                    icon: iconShareQzone,
                    click:() => {
                        this.shareToQzone()
                    }
                },
                {
                    name: 'QQ好友',
                    icon: iconShareQQ,
                    click:() => {
                        this.shareToQQ()
                    }
                }
            ],
        }
    },
    components:{
        Qrcode,
        ActionSheet, Popup
    },
    created() {
        // 监听 show 事件, 触发 showActionSheetShareHandler
        this.$on('show', this.showActionSheetShareHandler)
    },
    methods: {
        share(callback) {
            callback && callback()
        }
    }
}
</script>

<style lang="scss">

@import "../../style/index";

.share-list {
    display: flex;

    &__item {
        flex: none;
        margin: 0 px2rem(24px) 0 0;
    }

    .social-icon {
        margin-bottom: px2rem(20px);
        width: px2rem(120px);
        height: px2rem(120px);
        /*background-color: #fff;*/
        /*border-radius: px2rem(6px);*/
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0;

      img {
          width: 80%;
          height: 80%;
      }
    }

    .social-name {
        color: #888;
        font-size: px2rem(24px);
        text-align: center;
    }
}

.share-copytip {
    padding: px2rem(16px);
    font-size: px2rem(30px);
}

.share-wechat {
    text-align: center;
    padding: px2rem(40px);

    p {
        margin: 0;

    }

    &__title {
        font-size: px2rem(32px);
        color: #000;
        margin-bottom: px2rem(30px);
    }

    &__tip {
        padding-top: px2rem(22px);
        text-align: left;
        font-size: px2rem(28px);
        color: #999;
    }
}
</style>
