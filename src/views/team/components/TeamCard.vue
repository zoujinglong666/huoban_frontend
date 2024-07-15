<script setup lang="ts">
import {defineProps, PropType} from 'vue'
import {joinTeamApi, quitTeamApi} from "@/api/modules/team";
import {ResultEnum} from "@/enums/httpEnum";
import {showToast} from "vant";
import {useUserStore} from "@/store/modules/user";

const router = useRouter ()

const emit = defineEmits ( ['reload'] )


const props = defineProps ( {
  team: {
    type: Object as PropType<any>,
    required: true
  }
} )

const handleJoinTeam = async (team: any) => {

  const teamId = team.id
  if ( !teamId ) {
    return
  }

  if ( props.team.status == 0 ) {
    const params = {
      teamId,
    }
    const res = await joinTeamApi ( params )
    if ( res.code == ResultEnum.SUCCESS ) {
      showToast ( '加入队伍成功' )
      emit ( 'reload' )
    }
  }
  if ( props.team.status == 2 ) {
    show.value = true;
    currentTeamId.value = teamId;

  }
}
const handleQuitTeam = async (team: any) => {

  const teamId = team.id
  if ( !teamId ) {
    return
  }
  const params = {
    teamId,
  }
  const res = await quitTeamApi ( params )
  if ( res.code == ResultEnum.SUCCESS&&res.data ) {
    showToast ( '退出队伍成功' )
    emit ( 'reload' )
  }
}


const handleDetail = (team: any) => {
  router.push ( {
    name: 'TeamUpdate',
    params: {
      id: team.id
    }
  } )
}


const teamStautsMap = {
  '0': '公开',
  '1': '私密',
  '2': '加密',
}


const userStore = useUserStore ()

const currenUserId = computed ( () => userStore.userInfo.id )

const isMySelfCreateTeam = computed ( () => {
  return function (item) {
    return item.createUser.id === currenUserId.value
  }
} )
const show = ref(false);
const password = ref('');
const currentTeamId = ref('');

const handleJoinConfirm = async () => {
  if ( !currentTeamId.value || !password.value ) {
    return
  }
  const params = {
    teamId:currentTeamId.value,
    password: password.value
  }
  const res = await joinTeamApi ( params )
  if ( res.code == ResultEnum.SUCCESS ) {
    showToast ( '加入队伍成功' )
    emit ( 'reload' )
    show.value = false;
    currentTeamId.value = '';
    password.value = '';
  }else {
    show.value = true;
    currentTeamId.value = '';
    password.value = '';
    showToast ( '密码错误' )
  }
}

</script>

<template>
  <div class="user-card">
    <div class="user-card_left" >
      <van-image
        width="80px"
        height="80px"
        fit="cover"
        radius="8"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="user-card_right" >
      <div>
        <div>{{ props.team.name }}</div>
        <div>{{ props.team.description }}</div>
        <van-tag type="primary" size="mini">{{ teamStautsMap[props.team.status] }}</van-tag>
      </div>
      <van-space>
        <van-button v-if="!isMySelfCreateTeam(props.team)&&props.team.hasJoin===false" type="primary" size="mini" plain p-6
                    @click.stop="handleJoinTeam(props.team)">
          加入队伍
        </van-button>
        <van-button v-if="!isMySelfCreateTeam(props.team)&&props.team.hasJoin===true" type="warning" size="mini" plain p-6
                    @click.stop="handleQuitTeam(props.team)">
          退出队伍
        </van-button>
        <van-button  type="primary" size="mini" plain p-6
                    @click.stop="handleDetail(props.team)">
          查看详情
        </van-button>
      </van-space>
    </div>

    <van-dialog v-model:show="show" title="请输入队伍密码" show-cancel-button @confirm="handleJoinConfirm">
      <van-field placeholder="请输入密码" type="password" v-model="password"></van-field>
    </van-dialog>


  </div>

</template>


<style scoped lang="less">


.user-card {
  box-sizing: border-box;
  width: 100%;
  height: 96px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;

  &_left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 8px;
  }


  &_right {
    display: flex;
    justify-content: space-between;
    flex: 1;

    margin-left: 8px;

  }
}

</style>

