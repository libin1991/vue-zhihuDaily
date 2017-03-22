<template>
    <div class="theme-editor">
        <router-link :to="'/editorlist/' + id">
            <div class="theme-editor__hd">主编</div>
            <div class="theme-editor__bd">
                <span v-for="(item, index) in data" :key="item.id">
                    <img src="../../assets/img-loading.png" v-lazy="fixedImageUrl(item.avatar)" :alt="item.name" />
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
/*import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import defaultImg from '../../assets/img-loading.png'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: defaultImg,
    loading: defaultImg,
    attempt: 1
})*/

import fixedImageUrl from '../../mixins/fixedImageUrl'

export default {
    name: 'theme-editor',
    mixins: [fixedImageUrl],
    props: {
        id: {
            type: String,
            default: '',
            required: true
        },
        data: {
            type: Array,
            default: [],
            required: true
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.theme-editor {
    padding: 0 px2rem(30px);

    a {
        display: flex;
        /*align-items: top;*/
        padding: px2rem(30px) 0 px2rem(14px);
    }

    &__hd {
        margin-right: px2rem(40px);
        color: #808080;
        font-size: px2rem(28px);
        position: relative;
        top: px2rem(8px);
    }

    &__bd {
        flex: 1;
        font-size: 0;

        span {
            display: inline-block;
            width: px2rem(60px);
            height: px2rem(60px);
            border-radius: 99999px;
            overflow: hidden;
            margin-right: px2rem(20px);

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>
