<template>
    <div class="action-sheet">
        <transition name="overlay-fade" ref="overlay" @after-enter="show()" @after-leave="hide()">
            <div class="action-sheet-overlay" v-if="open" @click.stop="hideByOverlay" @touchmove.prevent></div>
        </transition>

        <transition name="action-sheet" @after-enter="show()" @after-leave="hide()">
            <div class="action-sheet-content" v-if="open">
                <div class="action-sheet-content__title" v-if="titleText">{{titleText}}</div>
                <div class="action-sheet-content__body">
                    <slot></slot>
                </div>
                <div class="action-sheet-content__cancel" @click.stop="hide" v-if="cancelShow">{{cancelText}}</div>
            </div>
        </transition>
    </div>
</template>

<script>
/**
 * https://github.com/museui/muse-ui/blob/master/src/bottomSheet/bottomSheet.vue
 */


export default{
    data() {
        return {}
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        // 标题
        titleText: {
            type: String,
            default: ''
        },
        // 取消按钮
        cancelText: {
            type: String,
            default: '取消'
        },
        // 是否显示取消按钮
        cancelShow: {
            type: Boolean,
            default: true
        },
        // 点击遮罩层是否关闭弹窗
        clickOverlayClose: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        show() {
            this.$emit('showHandler')

        },
        hide() {
            this.$emit('hideHandler')
        },
        hideByOverlay() {
            if (this.clickOverlayClose) {
                this.$emit('hideHandler')
            }
        }
    }
}
</script>

<style lang="scss">
/**
    https://mobile.ant.design/kitchen-sink/components/action-sheet
 */
@import "../style/index";

.action-sheet-overlay, .action-sheet-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
}

.action-sheet-overlay {
    height: 100%;
    background-color: rgba(0,0,0,.4);
}
.action-sheet-content {
    top: auto;
    background-color: #f2f2f2;

    &__title {
        padding: px2rem(20px);
        color: #888;
        text-align: center;
        font-size: px2rem(32px);
        border-bottom: 1px solid #ccc;
    }
    &__cancel {
        background-color: #fff;
        padding: px2rem(20px);
        color: #000;
        text-align: center;
        font-size: px2rem(36px);
        border-top: 1px solid #ddd;
    }

    &__body {
        padding: px2rem(40px);
        overflow-y: scroll;
    }
}

.action-sheet-enter-active,
.action-sheet-leave-active {
    transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1);
    backface-visibility: hidden;
}
.action-sheet-enter,
.action-sheet-leave-active {
    transform: translate3d(0, 100%, 0);
}

.overlay-fade-enter-active, .overlay-fade-leave-active {
    transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.overlay-fade-enter,
.overlay-fade-leave-active {
    opacity: 0 !important;
}
</style>
