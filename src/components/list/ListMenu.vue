<template>
    <div class="editor-item">
        <!--<router-link :to="'/editordetail/' + data.url">-->
        <a :href="data.url">
            <div class="editor-item__img" v-if="data.avatar">
                <img src="../../assets/img-loading.png" v-lazy="fixedImageUrl(data.avatar)" :alt="data.name" />
            </div>
            <div class="editor-item__text">
                <h3 v-text="data.name"></h3>
                <p v-text="data.bio"></p>
            </div>
        </a>
        <!--</router-link>-->
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
    name: 'list-menu',
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

.editor-item {
    a {
        position: relative;
        padding: px2rem(30px);
        color: #222;
        overflow: hidden;
        display: flex;
        align-items: center;

        &:after {
            content: "";
            position: absolute;
            left: px2rem(30px);
            right: px2rem(30px);
            bottom: 0;
            height: 1px;
            background-color: #e5e5e5;
        }
    }

    &__img {
        width: px2rem(80px);
        height: px2rem(80px);
        margin-right: px2rem(30px);
        overflow: hidden;
        border-radius: 9999px;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    &__text {
        h3 {
            font-size: px2rem(32px);
            font-weight: normal;
        }
        p {
            margin: px2rem(20px) 0 0 !important;
            font-size: px2rem(24px);
            color: #999;
        }
    }
}
</style>
