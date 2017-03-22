<template>
    <div class="news-item">
        <router-link :to="'/detail/' + data.id">
            <div class="news-item__img" v-if="data.images">
                <img src="../../assets/img-loading.png" v-lazy="fixedImageUrl(data.images)" :alt="data.title" />
                <span v-if="data.multipic">
                    <i class="iconfont icon-multipic"></i>
                    多图
                </span>
            </div>
            <div class="news-item__title" v-text="data.title"></div>
        </router-link>
    </div>
</template>

<script>
import fixedImageUrl from '../../mixins/fixedImageUrl'

export default {
    name: 'list',
    mixins: [fixedImageUrl],
    props: {
        data: {
            type: Object,
            default: {},
            required: true
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.news-item {
    padding: px2rem(20px);
    margin-bottom: px2rem(20px);
    background-color: $white;
    box-shadow: 0 px2rem(2px) px2rem(4px) 0 #bdbdbd;
    border-radius: px2rem(4px);
    overflow: hidden;
    min-height: px2rem(140px);

    &:last-child {
        margin-bottom: 0;
    }

    a {
        color: #222;
        display: block;
        overflow: hidden;
    }

    &__title {
        overflow: hidden;
    }

    &__img {
        width: px2rem(140px);
        height: px2rem(140px);
        float: right;
        margin-left: px2rem(60px);
        position: relative;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }

        span {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: px2rem(8px) px2rem(10px);
            color: #fff;
            font-size: px2rem(20px);
            line-height: 1;
            background-color: rgba(0,0,0,0.7);

            .iconfont {
                font-size: px2rem(16px);
            }
        }
    }
}
</style>
