<template>
    <div class="popup">
        <transition name="overlay-fade" @after-enter="show()" @after-leave="hide()">
            <div class="popup-overlay" v-if="open" @click.stop="hideByOverlay" @touchmove.prevent></div>
        </transition>

        <transition name="popup" @after-enter="show()" @after-leave="hide()">
            <div class="popup-content" v-if="open">
                <div class="popup-content__body">
                    <slot></slot>
                </div>
                <div class="popup-content__close" @click.stop="hide"><i class="iconfont icon-close"></i></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default{
    data() {
        return {
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        // 点击遮罩层是否关闭弹窗
        clickOverlayClose: {
            type: Boolean,
            default: false
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
@import "../../style/index";

.popup-overlay {
    height: 100%;
    background-color: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
}
.popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate3d(-50%, -50%, 0);

    background-color: #fff;
    border-radius: px2rem(8px);

    &__close {
        position: absolute;
        bottom: px2rem(-120px);
        left: 50%;
        margin-left: px2rem(-30px);
        color: #fff;
        line-height: 1;
        font-size: px2rem(60px);
    }

    &__body {
        font-size: px2rem(32px);
    }
}

/**
    顺序：
    enter
    enter-active
    leave
    leave-active
*/
.popup-enter,
.popup-enter-active,
.popup-leave,
.popup-leave-active {
    transition: all .2s cubic-bezier(0.23, 1, 0.32, 1);
    backface-visibility: hidden;
}
.popup-enter-active,
.popup-leave {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
}
.popup-enter,
.popup-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -70%, 0);
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.overlay-fade-enter,
.overlay-fade-leave-active {
    opacity: 0 !important;
}
</style>
