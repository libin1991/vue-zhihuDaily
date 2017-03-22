<template>
    <div class="popover-menu">
        <div class="popover-menu__button" @click="handleOpen">
            <slot name="icon"><i class="iconfont" :class="iconClass"></i></slot>
        </div>
        <popover
            :open="openMenu"
            :trigger="trigger"
            @close="handleClose"
        >
            <v-menu
                v-if="openMenu"
                :maxHeight="maxHeight"
            >
                <slot></slot>
            </v-menu>
        </popover>
    </div>
</template>

<script>
/**
 * @TODO: 点击空白位置关闭菜单
 * https://github.com/museui/muse-ui/blob/master/src/iconMenu/iconMenu.vue
 */
import Popover from './Popover'
import {Menu} from '../menu/index'

export default {
    name: 'popover-menu',
    props: {
        // 按钮图标 class
        iconClass: {
            type: String,
            default: ''
        },
        // 初始化是否默认打开
        open: {
            type: Boolean,
            default: false
        },
        // 最大高度
        maxHeight: {
            type: Number
        },
    },
    data() {
        return {
            openMenu: this.open,
            trigger: null
        }
    },
    components: {
        Popover, 'v-menu': Menu
    },
    created() {
        // 监听 onClose 事件, 触发 handleClose
        this.$on('onClose', this.handleClose)
    },
    mounted () {
        // 当前元素
        this.trigger = this.$el
    },
    watch: {
        open (val, oldVal) {
            if (val === oldVal) return
            this.openMenu = val
        }
    },
    methods: {
        handleOpen(ev) {
            ev.stopPropagation()
            this.openMenu = true
            this.$emit('open')

            // 定义关闭函数, 并且绑定到 document
            const bindClose = (ev) => {
                ev.stopPropagation()
                this.handleClose()
                document.removeEventListener('click', bindClose, false)
            }
            document.addEventListener('click', bindClose, false)
        },
        handleClose () {
            this.openMenu = false
            this.$emit('close')
        },
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.popover-menu {
    .iconfont {
        padding: px2rem(20px);
    }
}
</style>
