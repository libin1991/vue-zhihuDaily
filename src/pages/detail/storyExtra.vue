<template>
    <div class="story-extra">
        <span class="detail-action__share" @click="showActionSheetShare"><i class="iconfont icon-share-fill"></i></span>
        <span class="detail-action__collection" @click="actionCollection"><i class="iconfont icon-collection-fill"></i></span>
        <span class="detail-action__message"><router-link :to="{ path: '/comments/' + newsId, query: {count: message} }"><i class="iconfont icon-message-fill"></i><em>{{message}}</em></router-link></span>
        <span class="detail-action__praise" @click="actionPraise"><i class="iconfont icon-praise-fill"></i><em>{{praise}}</em></span>
    </div>
</template>

<script>
export default {
    name: 'story-extra',
    props: {
        message:{
            type: Number,
            required: true,
        },
        praise: {
            type: Number,
            required: true,
        },
        newsId: {
            type: String,
            required: true,
        },
        isPraised: {
            type: Boolean,
            required: false,
        },
        isCollected: {
            type: Boolean,
            required: false,
        }
    },
    methods: {
        showActionSheetShare(ev) {
            this.$emit('showActionSheetShareHandler', ev.target);
        },
        actionPraise(ev) {
            this.$emit('praiseHandler', ev.target);
        },
        actionCollection(ev) {
            this.$emit('collectionHandler', ev.target);
        },
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.story-extra {

    span {
        margin-left: px2rem(20px);

        em {
            position: relative;
            top: px2rem(-4px);
            font-style: normal;
        }

        &.active {
            .iconfont {
                color: #fffd00;
            }
        }
    }

    .iconfont {
        font-size: px2rem(40px);
        margin-right: px2rem(10px);
    }

    a {
        color: #fff;
    }
}
</style>
