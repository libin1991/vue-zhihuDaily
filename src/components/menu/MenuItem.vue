<template>
    <div class="menu-item" :disabled="disabled" @click="handleClick">
        <div class="menu-item__icon menu-item__icon_left" v-if="leftIconClass">
            <i class="iconfont" :class="leftIconClass"></i>
        </div>
        <div class="menu-item__title">{{title}}</div>
        <div class="menu-item__icon menu-item__icon_right" v-if="rightIconClass">
            <i class="iconfont" :class="rightIconClass"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu-item',
    props: {
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        leftIconClass: {
            type: String,
            default: ''
        },
        rightIconClass: {
            type: String,
            default: ''
        },
    },
    data() {
        return {}
    },
    components: {
    },
    methods: {
        handleClick (ev) {
            this.$emit('click', ev)
        },
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.menu-item {
    padding: 0 px2rem(40px);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: px2rem(86px);
    font-size: px2rem(30px);
    transition: all .2s linear;

    &:hover,
    &:active {
        background-color: #e5e5e5;
    }

    &__icon {
        color: #999;
        font-size: px2rem(36px);

        &_left {
            padding-left: px2rem(10px);
            padding-right: px2rem(30px);
        }

        &_right {
            padding-left: px2rem(30px);
            padding-right: px2rem(10px);
        }
    }

    &__title {
        flex: 1;
    }

    &[disabled="disabled"] {
        color: rgba(0,0,0, .38);
        cursor: not-allowed;

        &:hover,
        &:active {
          background-color: transparent;
        }

        .menu-item__icon {
            color: rgba(0, 0, 0, .2);
        }
    }
}
</style>