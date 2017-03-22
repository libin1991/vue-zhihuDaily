<template>
    <div class="page-state" @click="errorAction">
        <transition name="state-fade">
            <div class="page-state__error" v-if="state == 0">
                <slot name="error">
                    <div class="page-state__image"><img src="../../assets/error-page.png" /></div>
                    <div class="page-state__text">加载出错，请刷新重试</div>
                </slot>
            </div>
        </transition>

        <transition name="state-fade">
            <div class="page-state__loading" v-if="state == 1">
                <slot name="loading">
                    <div class="preloader-wrapper active">
                        <div class="spinner active">
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="page-state__text">努力加载中</div>
                </slot>
            </div>
        </transition>

        <transition name="state-fade">
            <div class="page-state__empty" v-if="state == 2">
                <slot name="empty">
                    <div class="page-state__image"><img src="../../assets/empty-page.png" /></div>
                    <div class="page-state__text">暂时没有任何内容~</div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default{
    data() {
        return {}
    },
    props: {
        state: {
            type: Number,
            default: 1
        }
    },
    methods: {
        errorAction() {
            this.$emit('errorHandler')
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.page-state {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;

    &__error, &__loading, &__empty {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    &__image {
        width: px2rem(240px);
        text-align: center;
        font-size: 0;
        margin: 0 auto;

        img {
            width: 100%;
        }
    }

    &__text {
        margin-top: px2rem(30px);
        font-size: px2rem(30px);
        color: #808080;
    }
}



.preloader-wrapper {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: px2rem(100px);
    height: px2rem(100px);
}

.preloader-wrapper.active {
    -webkit-animation: container-rotate 1568ms linear infinite;
    animation: container-rotate 1568ms linear infinite
}

.preloader-wrapper .circle {
    border-radius: 50%;
}

.preloader-wrapper .left {
    float: left !important
}

.preloader-wrapper .right {
    float: right !important
}

.spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-color: #007fff;
    opacity: 1;
    animation: fill-unfill-rotate 5332ms cubic-bezier(.4, 0, .2, 1) infinite both
}
.circle-clipper {
    display: inline-block;
    position: relative;
    width: 50%;
    height: 100%;
    overflow: hidden;
    border-color: inherit
}

.gap-patch {
    position: absolute;
    top: 0;
    left: 45%;
    width: 10%;
    height: 100%;
    overflow: hidden;
    border-color: inherit
}

.gap-patch .circle {
    width: 1000%;
    left: -450%
}

.circle-clipper .circle {
    width: 200%;
    height: 100%;
    border-width: px2rem(6px);
    border-style: solid;
    border-color: inherit;
    border-bottom-color: transparent !important;
    border-radius: 50%;
    -webkit-animation: none;
    animation: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0
}

.active .circle-clipper.left .circle {
    -webkit-animation: left-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
    animation: left-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both
}

.active .circle-clipper.right .circle {
    -webkit-animation: right-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
    animation: right-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both
}

.circle-clipper.left .circle {
    left: 0;
    border-right-color: transparent !important;
    -webkit-transform: rotate(129deg);
    transform: rotate(129deg)
}

.circle-clipper.right .circle {
    left: -100%;
    border-left-color: transparent !important;
    -webkit-transform: rotate(-129deg);
    transform: rotate(-129deg)
}

@keyframes fill-unfill-rotate {
    12.5% {
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg)
    }

    25% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }

    37.5% {
        -webkit-transform: rotate(405deg);
        transform: rotate(405deg)
    }

    50% {
        -webkit-transform: rotate(540deg);
        transform: rotate(540deg)
    }

    62.5% {
        -webkit-transform: rotate(675deg);
        transform: rotate(675deg)
    }

    75% {
        -webkit-transform: rotate(810deg);
        transform: rotate(810deg)
    }

    87.5% {
        -webkit-transform: rotate(945deg);
        transform: rotate(945deg)
    }

    to {
        -webkit-transform: rotate(1080deg);
        transform: rotate(1080deg)
    }
}

@keyframes left-spin {
    from {
        -webkit-transform: rotate(130deg);
        transform: rotate(130deg)
    }

    50% {
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg)
    }

    to {
        -webkit-transform: rotate(130deg);
        transform: rotate(130deg)
    }
}

@keyframes right-spin {
    from {
        -webkit-transform: rotate(-130deg);
        transform: rotate(-130deg)
    }

    50% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg)
    }

    to {
        -webkit-transform: rotate(-130deg);
        transform: rotate(-130deg)
    }
}

@-webkit-keyframes container-rotate {
    to {
        -webkit-transform: rotate(360deg)
    }
}

@keyframes container-rotate {
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
}


.state-fade-enter,
.state-fade-enter-active,
.state-fade-leave,
.state-fade-leave-active {
    transition: all .2s linear;
    backface-visibility: hidden;
}
.state-fade-enter-active,
.state-fade-leave {
    opacity: 1;
}
.state-fade-enter,
.state-fade-leave-active {
    opacity: 0;
}
</style>
