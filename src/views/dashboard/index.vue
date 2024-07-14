<template>
  <div class="h-screen flex flex-col" ref="scrollRef" @scroll="onPageScroll">

    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
        @click="handelClick"
      />
    </div>


    <scroll-list @refresh="getRecommendList" >
      <user-card :user-info="{...item,index}" v-for="(item,index) in recommendedUserList" :key="item.id"
      />
    </scroll-list>

  </div>
</template>

<script setup lang="ts" name="DashboardPage">
import {useGlobSetting} from '@/hooks/setting'
import router from "@/router";
import {recommendedUsers} from "@/api/modules/login";
import UserCard from "@/views/search/components/UserCard.vue";
import {usePlusStorage} from "@/hooks/usePlusStorage";
import useScrollCache from "@/hooks/useScrollCache";

defineOptions ( {
  name: 'DashboardPage',
} )

const globSetting = useGlobSetting ()

const {title} = globSetting
const value = ref ( '' )
const refreshing = ref ( false )

const {onScrollBody, scrollRef} = useScrollCache ();
//页面滚动
const onPageScroll = () => {
  onScrollBody ();
}
const handelClick = () => {
  router.push ( "/search/index" )
}
const recommendedUserList = ref ( [] )
const getRecommendList = async () => {
  const params = {
    pageSize: 10,
    pageNum: 1
  }

  const res = await recommendedUsers ( params )
  recommendedUserList.value = res.data.records || []

  setTimeout ( () => {
    refreshing.value = false
  }, 60000 )
}

const {setItem, getItem} = usePlusStorage ()

onMounted ( () => {
  getRecommendList ()
} )


</script>

<style scoped lang="less"></style>
