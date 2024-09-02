<template>
  <div class="h-screen flex flex-col" ref="scrollRef" @scroll="onPageScroll">
    <div position="sticky" top="0" class="bg-white z-10">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
        @click="handelClick"
      />
    </div>
    <ScrollList v-model:list="recommendedUserList" :api="recommendedUsers" @scroll="onScrollBody">
      <user-card :user-info="item" v-for="(item,index) in recommendedUserList" :key="item.id"
      />
    </ScrollList>
  </div>
</template>

<script setup lang="ts" name="DashboardPage">
import {useGlobSetting} from '@/hooks/setting'
import router from "@/router";
import {recommendedUsers} from "@/api/modules/login";
import UserCard from "@/views/search/components/UserCard.vue";
import useScrollCache from "@/hooks/useScrollCache";
defineOptions ( {
  name: 'DashboardPage',
} )

const value = ref ( '' )
const {onScrollBody, scrollRef} = useScrollCache ();
//页面滚动
const onPageScroll = () => {
  onScrollBody ();
}
const handelClick = () => {
  router.push ( "/search/index" )
}
const recommendedUserList = ref ( [] )


</script>

<style scoped lang="less"></style>
