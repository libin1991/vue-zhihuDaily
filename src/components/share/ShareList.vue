<template>
    <div class="share-list">
        <div class="share-list__item" @click="share(item.click)" v-for="(item, index) in actionLists">
            <div class="social-icon"><img :src="item.icon" /></div>
            <div class="social-name">{{item.name}}</div>
        </div>
    </div>
</template>

<script>


import shareMixin from '../../mixins/share'

export default{
    mixins: [shareMixin],
    data() {
        return {}
    },
    props: {

    },
    methods: {
        // https://github.com/myronliu347/vue-carbon/blob/master/src/actionSheet/actionSheet.vue
        // https://github.com/myronliu347/vue-carbon/blob/master/src-examples/views/actionSheet.vue
        share(callback) {
            callback && callback()
        }
    }
}
</script>

<style lang="scss">
/**
 *  https://mobile.ant.design/kitchen-sink/components/action-sheet
 */
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

</style>
