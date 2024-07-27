<template>
  <div>
    <NavBar/>
    <van-cell-group inset>
      <van-field
        v-model="passwordRequest.oldPassword"
        type="password"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="passwordRequest.newPassword"
        type="password"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="passwordRequest.checkPassword"
        type="password"
        label="确认新密码"
        placeholder="确认新密码"
        :rules="[{ required: true, message: '请再次填写新密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" @click="onSubmit()">
        提交
      </van-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import {useUserStore} from "@/store/modules/user";
import {showFailToast} from "vant";
import {resetPassword} from "@/api/modules/login";
import {ResultEnum} from "@/enums/httpEnum";


const passwordRequest = ref ( {
  oldPassword: '',
  newPassword: '',
  checkPassword: '',
} )

const userStore = useUserStore ()
const onSubmit = async () => {


  const params = {
    ...passwordRequest.value,
    id: userStore.userInfo.id
  }

  if ( !params.oldPassword ) {
    showFailToast ( '请填写旧密码' )
    return
  }

  if ( !params.newPassword.length ) {
    showFailToast ( '请填写新密码' )
    return
  }
  if ( !params.checkPassword.length ) {
    showFailToast ( '请再次填写新密码' )
    return
  }

  if ( params.newPassword !== params.checkPassword ) {
    showFailToast ( '两次密码输入不一致' )
    return
  }
  if ( params.oldPassword === params.newPassword ) {
    showFailToast ( '新旧密码不能相同' )
    return
  }

  const res = await resetPassword ( params )
  if(res.code==ResultEnum.SUCCESS){
    showFailToast ( '密码修改成功' )
    await userStore.Logout ()
  }else{
    showFailToast ( res.message )
  }


};
</script>

<style scoped></style>
