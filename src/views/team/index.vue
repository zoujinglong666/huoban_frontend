<template>
  <div>
    <van-nav-bar title="队伍" placeholder fixed safe-area-inset-top safe-area-inset-bottom >
      <template #right>
        <van-icon @click="addTeam" name="add" size="18"/>
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" >
      <van-tab  v-for="(item, index) in tabOptions" :key="index" :title="item"></van-tab>
    </van-tabs>
    <scroll-list v-if="active === 0" @refresh="fetchTeamData('created')">
      <team-card v-for="item in teamList" :key="item.id" :team="item"/>
    </scroll-list>
    <scroll-list v-if="active === 1" @refresh="fetchTeamData('joined')">
      <team-card v-for="item in myJoinedTeamList" :key="item.id" :team="item"/>
    </scroll-list>
    <scroll-list v-if="active === 2" @refresh="fetchTeamData('all')">
      <team-card v-for="item in allTeamList" :key="item.id" :team="item"/>
    </scroll-list>
  </div>
</template>

<script setup lang="ts">
import {listTeam, queryMyCreatedTeamsApi, queryMyJoinedTeamsApi} from "@/api/modules/team";
import TeamCard from "@/views/team/components/TeamCard.vue";
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const active = ref(0);
const tabOptions = ['我创建的', '我加入的', '全部'];
const teamList = ref([]);
const myJoinedTeamList = ref([]);
const allTeamList = ref([]);

const fetchTeamData = async (type) => {
  let res;
  switch (type) {
    case 'created':
      res = await queryMyCreatedTeamsApi({});
      teamList.value = res.data || [];
      break;
    case 'joined':
      res = await queryMyJoinedTeamsApi({});
      myJoinedTeamList.value = res.data || [];
      break;
    case 'all':
      res = await listTeam({});
      allTeamList.value = res.data || [];
      break;
  }
};

const addTeam = () => {
  router.push('/team/add');
};

onMounted(() => {
  fetchTeamData('created');
  fetchTeamData('joined');
  fetchTeamData('all');
});
</script>

<style scoped lang="less">


</style>
