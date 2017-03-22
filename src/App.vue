<template>
    <div id="app">
        <!--<transition name="app-forward">-->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        <!--</transition>-->
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss">
@import './style/core/index';

.app-body {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
}
.app-forward-enter-active,
.app-forward-leave-active {
    transition: all 50s;
}
.app-forward-enter,
.app-forward-leave-active {
    opacity: 0;
}
.app-forward-enter {
    transform: translateX(100%);
}
.app-forward-leave-active {
    transform: translateX(-100%);
}

.app-forward {
    /*transform: ;   */
}

.app-back {
}




/* Page */
/* Header */
/* Thin Border */
.page-enter-active,
.page-leave-active,
.grade-a .page-enter-active,
.grade-a .page-leave-active {
    -webkit-transition-duration: 500ms;
    transition-duration: 500ms;
    -webkit-transition-timing-function: cubic-bezier(0.36, 0.66, 0.04, 1);
    transition-timing-function: cubic-bezier(0.36, 0.66, 0.04, 1);
    -webkit-transition-property: opacity, -webkit-transform;
    transition-property: opacity, transform;
}
.grade-b .page-enter-active,
.grade-b .page-leave-active {
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
    transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
}
[transition-direction="forward"] .page-enter {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 1;
    z-index: 2;
}
[transition-direction="forward"] .page-enter-active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
[transition-direction="forward"] .page-enter-to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 2;
}
[transition-direction="forward"] .page-leave {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    z-index: 1;
}
[transition-direction="forward"] .page-leave-to {
    -webkit-transform: translate3d(-33%, 0, 0);
    transform: translate3d(-33%, 0, 0);
    opacity: 0;
    z-index: 1;
}
[transition-direction="back"] .page-enter {
    -webkit-transform: translate3d(-33%, 0, 0);
    transform: translate3d(-33%, 0, 0);
    opacity: 0.8;
    z-index: 1;
}
[transition-direction="back"] .page-enter-to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 1;
}
[transition-direction="back"] .page-leave {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
    z-index: 2;
}
[transition-direction="back"] .page-leave-active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
[transition-direction="back"] .page-leave-to {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 1;
    z-index: 2;
}
</style>
