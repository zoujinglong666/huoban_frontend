<script setup lang="ts">

const props=defineProps({
  text:{
    type:String,
    default:"加载中..."
  }
})

</script>

<template>
  <van-loading size="16">{{props.text}}</van-loading>
</template>

<style scoped lang="less">

</style>
