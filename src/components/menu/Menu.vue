<template>
    <div class="menu-list">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'menu',
    props: {
        maxHeight: {
            type: Number
        },
    },
    data() {
        return {}
    },
    components: {
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.menu-list {
    padding: px2rem(16px) 0;
    user-select: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: px2rem(300px);

    &__middle {
        width: px2rem(450px);
    }

    &__large {
      width: px2rem(600px);
    }

    > .divider-line {
        margin: px2rem(16px) 0;
    }

}
</style>