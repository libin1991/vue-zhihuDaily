<template>
    <div class="toast" :class="className" :data-type="icon">
        <transition name="overlay-fade">
            <div class="toast__overlay" v-show="visible && overlay" :style="{ backgroundColor: overlayBackground, opacity: overlayOpacity }" @touchmove.prevent></div>
        </transition>

        <transition name="toast">
            <div class="toast__content" ref="toastContent" v-show="visible" :class="positionClass" @touchmove.prevent>
                <i class="toast__icon" :class="iconClass" v-if="iconClass !== ''"></i>
                <div class="toast__text" v-html="content"></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'toast',
    props: {
        content: {
            type: String,
            default: '',
        },
        position: {
            type: String,
            default: 'bottom'
        },
        className: {
            type: String,
            default: ''
        },
        overlay: {
            type: Boolean,
            default: true
        },
        overlayOpacity: {
            type: Number,
            default: 0
        },
        overlayBackground: {
            type: String,
            default: '#000'
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            visible: false
        };
    },
    computed: {
        // icon className
        iconClass() {
            let classes = '';
            switch (this.icon) {
                case 'success':
                    classes = 'iconfont icon-success'
                    break;
                case 'fail':
                    classes = 'iconfont icon-fail'
                    break;
                case 'offline':
                    classes = 'iconfont icon-offline'
                    break;
                case 'loading':
                    classes = 'iconfont icon-loading animate-loading'
                    break;
                default:
                    classes = ''
            }
            return classes
        },
        // position className
        positionClass() {
            let classes = [];
            switch (this.position) {
                case 'middle':
                    classes.push('toast__middle')
                    break;
                default:
                    classes.push('toast__bottom')
            }
            classes.push(this.className)
            return classes.join(' ')
        }
    }
};
</script>


<style lang="scss">
  @import "../../style/index";

.toast {
    &__overlay {
        height: 100%;
        background-color: #000;
        opacity: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }

    &__content {
        position: fixed;
        max-width: 80%;
        padding: px2rem(28px) px2rem(42px);
        border-radius: px2rem(12px);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
        z-index: 1000;
    }

    &[data-type="success"],
    &[data-type="fail"],
    &[data-type="offline"],
    &[data-type="loading"] {
        .toast__content {
            border-radius: px2rem(20px);
            min-width: px2rem(224px);
            min-height: px2rem(224px);
        }
    }

    &__middle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &__bottom {
        left: 50%;
        bottom: px2rem(60px);
        transform: translate(-50%, 0);
    }

    &__icon {
        display: block;
        text-align: center;
        font-size: px2rem(90px);
        width: px2rem(98px);
        height: px2rem(98px);
        margin: px2rem(2px) auto px2rem(28px);

        &.animate-loading {
            width: px2rem(98px);
            height: px2rem(98px);
            display: inline-block;
            vertical-align: middle;
            animation: loading 1s steps(12, end) infinite;
            background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
          background-size: 100%;
        }
    }

    &__text {
        font-size: px2rem(28px);
        display: block;
        text-align: center;
        line-height: 1;
        padding: px2rem(6px) 0;
    }
}

.toast-enter,
.toast-enter-active,
.toast-leave,
.toast-leave-active {
    transition: all .15s linear;
}
.toast-enter-active,
.toast-leave {
    opacity: 1;
}
.toast-enter,
.toast-leave-active {
    opacity: 0;
}

.toast__bottom.toast-enter-active {
    animation: slideToast .8s 1 linear;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity .2s cubic-bezier(0.23, 1, 0.32, 1);
}
.overlay-fade-enter,
.overlay-fade-leave-active {
    opacity: 0 !important;
}

@keyframes slideToast {
     0% { bottom: 0; opacity: 0; }
    20% { bottom: px2rem(80px); opacity: 1; }
    40% { bottom: px2rem(60px); opacity: 1; }
    100% { bottom: px2rem(60px); opacity: 1; }
}

@keyframes loading {
    0% { transform: rotate3d(0, 0, 1, 0deg); }
  100% { transform: rotate3d(0, 0, 1, 360deg); }
}
</style>