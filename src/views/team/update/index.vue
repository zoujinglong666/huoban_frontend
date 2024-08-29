<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import NavBar from "@/components/Navbar/index.vue";
import {useUserStore} from "@/store/modules/user";
import {dissolveTheTeamApi, getTeamDetailApi, updateTeam} from "@/api/modules/team";
import {ResultEnum} from "@/enums/httpEnum";
import {showFailToast, showSuccessToast} from "vant";
import useConfirm from "@/hooks/useConfirm";


const route = useRoute ()


const detailId = computed ( () => {
  return route.params.id
} )


const addTeamForm = reactive ( {
  name: '',
  maxNum: 3,
  expireTime: '',
  status: 0,
  description: '',
  password: '',

} )
const showPicker = ref ( false )
const showPassword = ref ( false )


const currentDate = ref ( [] );
const currentTime = ref ( [] );

function getCurrentDateTime() {
  const now = new Date ();

  // 获取当前日期
  const year = now.getFullYear ().toString ();
  const month = (now.getMonth () + 1).toString ().padStart ( 2, '0' ); // 月份从0开始，需要加1
  const day = now.getDate ().toString ().padStart ( 2, '0' );

  // 获取当前时间
  const hours = now.getHours ().toString ().padStart ( 2, '0' );
  const minutes = now.getMinutes ().toString ().padStart ( 2, '0' );

  return {
    date: [year, month, day],
    time: [hours, minutes]
  };
}

const {date, time} = getCurrentDateTime ();
currentDate.value = date;
currentTime.value = time;
const userStore = useUserStore ();

const showPasswordField = computed ( () => {
  return addTeamForm.status == 2
} )
const router = useRouter ()
const updateTeamInfo = async () => {

  const userId = userStore.userInfo?.id || ''
  if ( !userId ) {
    showFailToast ( '请先登录' )
    return
  }
  const params = {
    ...addTeamForm,
    password: addTeamForm.password || '',
  }
  const {code} = await updateTeam ( params )
  if ( code == ResultEnum.SUCCESS ) {
    await router.push ( '/team/index' )
    showSuccessToast ( '更新成功' )
  }


}


console.log ( userStore.userInfo )

const isTeamOwner = computed ( () => {
  return userStore.userInfo?.id === addTeamForm.userId
} )
const dissolveTheTeam = async () => {
  if ( detailId.value == null ) {
    return
  }
  const params = {
    teamId: Number ( detailId.value ),
  }

  useConfirm ( async () => {
    const res = await dissolveTheTeamApi ( params )
    if ( res.code === ResultEnum.SUCCESS ) {
      showSuccessToast ( '解散成功' )
      await router.push ( '/team/index' )
    } else {
      showFailToast ( '解散失败' )
    }
  }, '确认解散队伍？' )


}

function formatExpirationTime(date) {
  if ( date && date[0] && date[1] && date[0].selectedValues && date[1].selectedValues ) {
    const specificDate = date[0].selectedValues.join ( '-' );
    const timeStr = date[1].selectedValues.join ( ':' );
    const dateTimeStr = `${specificDate} ${timeStr}`;

    // 创建 Date 对象
    const dateTime = new Date ( dateTimeStr );

    // 检查日期是否有效
    if ( isNaN ( dateTime.getTime () ) ) {
      return "Invalid date time";
    }

    // 加上八个时区（8小时）
    const eightHoursInMillis = 8 * 60 * 60 * 1000;
    const dateTimeWithOffset = new Date ( dateTime.getTime () + eightHoursInMillis );

    // 格式化为 ISO 8601 格式
    const isoDateTime = dateTimeWithOffset.toISOString ();
    return isoDateTime;
  }
  return "Invalid date time";
}


const onConfirm = (date: any[]) => {
  showPicker.value = false
  if ( date.length === 2 ) {
    addTeamForm.expireTime = formatExpirationTime ( date );
  }
}

const handleStatusChange = (event: any) => {
  if ( event != 2 ) {
    addTeamForm.password = ''
  }
}

const getTeamDetail = async () => {
  if ( !detailId.value ) {
    return
  }
  const params = {
    id: Number ( detailId.value ),
  }

  const {data} = await getTeamDetailApi ( params )
  if ( data ) {
    Object.assign ( addTeamForm, {
      ...data,
      status: data.status.toString (),
    } )
  }
}

onMounted ( () => {
  getTeamDetail ()
} )


</script>

<template>
  <NavBar>
  </NavBar>
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="addTeamForm.name"
        name="队伍名"
        label="队伍名"
        placeholder="队伍名"
        :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field name="stepper" label="队伍人数" >
        <template #input>
          <van-stepper v-model="addTeamForm.maxNum"/>
        </template>
      </van-field>
      <van-field
        v-model="addTeamForm.expireTime"
        is-link
        readonly
        name="datePicker"
        label="时间选择"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-field name="radio" label="是否公开">
        <template #input>
          <van-radio-group size="small" v-model="addTeamForm.status" direction="horizontal"
                           @change="handleStatusChange">
            <van-radio size="small" name="0">公开</van-radio>
            <van-radio size="small" name="1">私有</van-radio>
            <van-radio size="small" name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="showPasswordField"
        v-model="addTeamForm.password" readonly clickable @click="showPassword = true"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '密码' }]"
      />
      <van-field
        v-model="addTeamForm.description"
        type="textarea"
        maxlength="200"
        show-word-limit
        rows="3"
        name="队伍描述"
        label="队伍描述"
        placeholder="队伍描述"
        :rules="[{ required: true, message: '请填写队伍描述' }]"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker-group
          title="队伍过期时间"
          :tabs="['选择日期', '选择时间']"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        >
          <van-date-picker
            v-model="currentDate"
          />
          <van-time-picker v-model="currentTime"/>
        </van-picker-group>
      </van-popup>
      <van-number-keyboard
        title="请输入队伍密码"
        close-button-text="完成"
        v-model="addTeamForm.password"
        :show="showPassword"
        :maxlength="6"
        @blur="showPassword = false"
      />
    </van-cell-group>
    <div
      style="position: fixed;bottom: 0;left: 0;right: 0;width: 100%;gap: 10px;background-color: #fff;padding: 10px;box-sizing: border-box;z-index: 1;">
      <div style="display: flex;gap: 10px;">
        <van-button v-if="isTeamOwner" round block type="primary" @click="updateTeamInfo">
          更新队伍
        </van-button>
        <van-button v-if="isTeamOwner" round block plain type="danger" @click="dissolveTheTeam">
          解散队伍
        </van-button>
      </div>
    </div>
  </van-form>

</template>

<style scoped lang="less">

</style>
