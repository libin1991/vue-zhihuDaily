<template>
    <transition name="popover" @after-enter="show()" @after-leave="hide()">
        <div class="popover" ref="popup" v-show="open">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
/**
 * https://museui.github.io/#/iconMenu
 * https://github.com/museui/muse-ui/blob/master/src/popover/popover.vue
 * https://github.com/museui/muse-ui/blob/master/src/internal/popup/index.js
 */

export default{
    name: 'popover',
    props: {
        open: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: Element
        },
    },
    data () {
        return {
        }
    },
    components: {
    },
    mounted() {
        if (!this.$refs.popup) {
            console.warn('必须有一个 ref="popup" 的元素')
            return
        }
        document.body.appendChild(this.$refs.popup)
    },
    methods: {
        show() {
            this.$emit('show')
        },
        hide() {
            this.$emit('hide')
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.popover {
    position: fixed;
    background: #fff;
    border-radius: px2rem(4px);
    max-height: 100%;
    overflow: visible;
    box-shadow: 0 px2rem(2px) px2rem(12px) rgba(0,0,0, 0.12), 0 px2rem(2px) px2rem(8px) rgba(0,0,0, 0.12);
    transform-origin: center top;
    -webkit-overflow-scrolling: touch;

    top: px2rem(20px);
    right: px2rem(20px);
    z-index: 1000;
}

.popover-enter-active, .popover-leave-active{
    transition-duration: .3s;
    transition-property: opacity, transform;
}
.popover-enter, .popover-leave-active {
    transform: scaleY(0);
    opacity: 0;
}
</style>
