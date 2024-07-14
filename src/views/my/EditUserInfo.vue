<template>
  <div>
    <NavBar/>
    <van-divider>基本信息</van-divider>
    <van-field
      label="头像"
      label-class="font-bold"
      input-align="right"
      :center="true"
      :border="false"
      is-link
      readonly
    >
      <template #input>
        <UploaderImage>
          <van-image
            class="h-16 w-16"
            round fit="cover"
            :src="avatar"
          />
        </UploaderImage>
      </template>
    </van-field>

    <van-field
      v-model="state.username"
      label="昵称"
      readonly
      label-class="font-bold"
      input-align="right"
      :center="true"
      :border="false"
      is-link
      to="/editNickname"
    />

    <van-field
      v-model="genderText"
      label="性别"
      readonly
      label-class="font-bold"
      input-align="right"
      :center="true"
      :border="false"
      is-link
      @click="showGenderPicker = true"
    />

    <van-field
      v-model="state.tags"
      label="标签"
      readonly
      label-class="font-bold"
      input-align="right"
      :center="true"
      :border="false"
      is-link
    />
    <van-popup v-model:show="showGenderPicker" position="bottom" round>
      <van-picker
        v-model="state.genderValues"
        visible-option-num="3"
        :columns="genderColumns"
        title="选择性别"
        @confirm="handleGender"
        @cancel="showGenderPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import UploaderImage from './components/UploaderImage.vue'
import type {FormColumns} from './pickColumns'
import {genderColumns} from './pickColumns'
import {useUserStore} from '@/store/modules/user'
import {updateUserInfo} from "@/api/modules/login";
import {ResultEnum} from "@/enums/httpEnum";
import {showSuccessToast} from "vant";

const userStore = useUserStore ()
const {avatar, gender, cover} = userStore.getUserInfo
const showGenderPicker = ref ( false )

const state = reactive ( {
  username: '',
  tags: '',
  sign: '',
  gender: '',
  industryText: '',
  industryValues: [0],
  genderValues: [0],
} )

const genderText = computed ( {
  get() {
    return state.gender ? "女" : "男"
  },

} )

async function handleGender({selectedOptions}) {
  console.log ( selectedOptions, "selectedOptions" )
  state.gender = selectedOptions[0].text


  const params = {
    ...userStore.getUserInfo,
    gender: state.gender === '女' ? 1 : 0
  }
  const res = await updateUserInfo ( params )
  if ( res.code === ResultEnum.SUCCESS ) {
    showSuccessToast ( "更新成功" )
    userStore.setUserInfo ( params )
    initState ()


  }
  showGenderPicker.value = false
}


function initState() {
  Object.keys ( state ).forEach ( (key) => {
    state[key] = userStore.getUserInfo[key]
  } )
  state.genderValues = [gender]
  state.username = userStore.getUserInfo.username
  state.tags = userStore.getUserInfo.tags ? JSON.parse ( userStore.getUserInfo.tags ).join ( "," ) : ""
}

onMounted ( () => {
  initState ()
} )
</script>

<style scoped lang="less">
.cover {
  :deep(.van-image__img) {
    border-radius: 10px !important;
  }
}

:deep(.van-field__control) {
  color: var(--van-text-color-2);
}
</style>
