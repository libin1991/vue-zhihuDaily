<template>
    <div class="comments-item">
        <div class="comments-item__img" v-if="data.avatar">
            <img src="../../assets/img-loading.png" v-lazy="fixedImageUrl(data.avatar)" :alt="data.author" />
        </div>
        <div class="comments-item__text">
            <h3 class="comments-name" v-text="data.author"></h3>
            <div class="comments-content" v-html="data.content"></div>
            <div class="comments-likes" v-text="data.likes + '人赞'"></div>
            <div class="comments-time" v-text="data.time"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import defaultImg from '../../assets/img-loading.png'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: defaultImg,
    loading: defaultImg,
    attempt: 1
})

import fixedImageUrl from '../../mixins/fixedImageUrl'

export default {
    name: 'list-comments',
    mixins: [fixedImageUrl],
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";


.comments-item {
    position: relative;
    padding: px2rem(40px) 0 px2rem(30px);
    display: flex;

    &:after {
        content: ''; height: 1px; background-color: #ccc;
        position: absolute; left: px2rem(-50px); right: px2rem(-50px); bottom: 0;
    }

    &:last-child {
        &:after {
            display: none;
        }
    }

    &__img {
        width: px2rem(60px);
        height: px2rem(60px);
        margin-right: px2rem(20px);
        border-radius: 9999px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &__text {
        flex: 1;
        min-width: 0;
        position: relative;
        text-align: justify;

        .comments-name  {
            color: #000;
            font-size: px2rem(32px);
            margin-bottom: px2rem(30px);
        }

        .comments-content {
            font-size: px2rem(30px);
        }

        .comments-likes {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 1;
            color: #ccc;
            font-size: px2rem(26px);
        }

        .comments-time {
            font-size: px2rem(26px);
            margin: px2rem(30px) 0 px2rem(10px);
            color: #ccc;
        }
    }
}
</style>
