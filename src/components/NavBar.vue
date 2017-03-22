<template>
    <div class="navbar" :class="{fixed: isFixed}">
        <div class="navbar-left">
            <slot name="left">
                <div class="toggle-side-nav" :class="{active: isOpen}" @click="toggleSideNav" slot="left">
                  <i class="line"></i>
                  <i class="line"></i>
                  <i class="line"></i>
                </div>
            </slot>
        </div>
        <div class="navbar-title">{{pageTitle}}</div>
        <div class="navbar-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default{
    data() {
        return {}
    },
    props: {
        pageTitle: {
            type: String,
            default: ''
        },
        isFixed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            'isOpen'
        ]),
    },
    methods: {
        ...mapActions([
            'toggleSideNav'
        ]),
        goBack: function() {
            window.history.back();
        }
    }
}
</script>

<style lang="scss">
@import "../style/index";

.navbar {
    height: $layout-header-height;
    padding: $layout-header-padding;
    color: $layout-header-text-color;
    background-color: $layout-header-background;
    display: flex;
    position: relative;
    white-space: nowrap;
    align-items: center;

    a {
        color: #fff;
    }

    &.fixed {
        position: fixed;
        top: 0;
        left: 50%;
        right: 0;
        z-index: 11;
        width: 100%;
        transform: translateX(-50%);
    }
}
.navbar-title {
    flex: 1;
    padding: 0 px2rem(20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
}

/* 侧边菜单 */
.toggle-side-nav {
    padding: px2rem(20px);
    margin-right: px2rem(10px);

    .line {
        display: block;
        width: px2rem(40px);
        height: px2rem(4px);
        margin: px2rem(8px) auto;
        background-color: $layout-header-text-color;
        transition: all 0.3s ease-in-out;
    }
    &.active {
        .line {
            &:nth-child(2) {
                opacity: 0;
            }
            &:nth-child(1) {
                transform: translateY(px2rem(12px)) rotate(45deg);
            }
            &:nth-child(3) {
                transform: translateY(px2rem(-12px)) rotate(-45deg);
            }
        }
    }
}
/* 返回 */
.goback {
    padding: px2rem(15px);

    .line {
        display: block;
        width: px2rem(40px);
        height: px2rem(4px);
        margin: px2rem(6px) auto;
        background-color: $layout-header-text-color;
        transition: all 0.3s ease-in-out;

        &:nth-child(1),
        &:nth-child(3) {
            width: px2rem(30px);
        }

        &:nth-child(1) {
            transform: translateX(px2rem(-10px)) rotate(-45deg);
        }

        &:nth-child(3) {
            transform: translateX(px2rem(-10px)) rotate(45deg);
        }
    }
}
</style>
