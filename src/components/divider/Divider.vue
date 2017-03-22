<template>
    <div class="divider-line"></div>
</template>

<script>
export default {
    name: 'divider',
    props: {
        inset: {
            type: Boolean,
            default: false
        },
        shallowInset: {
            type: Boolean,
            default: false
        }
  }
}
</script>

<style>
.divider-line {
    margin: 0;
    height: 1px;
    border: none;
    background-color: rgba(0,0,0, 0.2);
    width: 100%;
}
</style>