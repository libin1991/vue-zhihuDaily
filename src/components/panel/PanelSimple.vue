<template>
    <div class="panel">
        <div class="panel-hd" v-if="panelTitle"><h2 v-text="panelTitle"></h2></div>
        <div class="panel-bd">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        props: {
            panelTitle: {
                type: String,
                default: ''
            },
            panelTitleShow: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss">
@import "../../style/index";

.panel {
    padding: px2rem(20px) px2rem(30px);

    .panel-hd {
        padding: px2rem(20px) 0 px2rem(30px) px2rem(10px);
        font-size: px2rem(20px);
        color: #bdbdbd;
    }
}
</style>
