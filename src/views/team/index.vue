<template>

  <div style="height: 100%;display: flex;flex-direction: column">
    <div  style="z-index: 9999;position:fixed;top:0;left:0;right:0;height:90px;background-color: #fff;box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
      <van-nav-bar title="队伍">
        <template #right>
          <van-icon @click="addTeam" name="add" size="18"/>
        </template>
      </van-nav-bar>
      <van-tabs v-model:active="active" swipeable sticky style="z-index: 9999;">
        <van-tab v-for="(item,index) in tabOptions" :title="item">
        </van-tab>
      </van-tabs>
    </div>

    <div class="position-box">
      <div v-if="active === 0">
        <scroll-list @refresh="listTeam">
          <team-card v-for="(item,index) in teamList" :key="item.id"
                     :team="item"/>
        </scroll-list>
      </div>
      <div v-if="active === 1">
        <scroll-list @refresh="getTeamMyJoinedList">
          <team-card v-for="(item,index) in myJoinedTeamList" :key="item.id"
                     :team="item"/>
        </scroll-list>
      </div>
      <div v-if="active === 2">
        <scroll-list @refresh="getTeamAllList">
          <team-card @reload="getTeamAllList" v-for="(item,index) in allTeamList" :key="item.id"
                     :team="item"/>
        </scroll-list>
      </div>
    </div>


  </div>


</template>

<script setup lang="ts">

import {listTeam, queryMyCreatedTeamsApi, queryMyJoinedTeamsApi} from "@/api/modules/team";
import TeamCard from "@/views/team/components/TeamCard.vue";

const router = useRouter ()
const active = ref ( 0 )
const tabOptions = reactive ( ['我加入的', '我创建的', '全部' ] )
const allTeamList = ref<any> ( [] )
const addTeam = () => {
  router.push ( '/team/add' )
}
const teamList = ref<any> ( [] )
const myJoinedTeamList = ref<any> ( [] )
const refreshing = ref ( false )
const getTeamList = async () => {


  const res = await queryMyCreatedTeamsApi ( {} )
  teamList.value = res.data || []

  setTimeout ( () => {
    refreshing.value = false
  }, 60000 )
}

const getTeamMyJoinedList = async () => {

  const res = await queryMyJoinedTeamsApi ( {} )
  myJoinedTeamList.value = res.data || []

  setTimeout ( () => {
    refreshing.value = false
  }, 60000 )
}

const getTeamAllList = async () => {
  refreshing.value = true
  const res = await listTeam ( {} )
  allTeamList.value = res.data || []
  setTimeout ( () => {
    refreshing.value = false
  }, 60000 )
}

onMounted ( () => {
  getTeamList ()
  getTeamAllList ()
  getTeamMyJoinedList ()
} )


</script>

<style scoped lang="less">
.position-box {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


