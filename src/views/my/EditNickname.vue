<template>
  <div>
    <NavBar>
      <template #right>
        <span @click="handleNickname">保存</span>
      </template>
    </NavBar>
    <van-form ref="formRef">
      <van-field
        v-model="formValue.username"
        class="mt-4"
        name="username"
        :placeholder="customPlaceholder"
        :rules="[
          {
            validator: validateNickname(),
            trigger: 'onChange',
          },
        ]"
      />
    </van-form>

    <div class="note p-6">
      <p>昵称支持2-12个中文字符或3-24个英文字符，</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {FormInstance} from 'vant'
import {showSuccessToast} from 'vant'
import NavBar from './components/NavBar.vue'
import {useUserStore} from '@/store/modules/user'
import {updateUserInfo} from "@/api/modules/login";
import {ResultEnum} from "@/enums/httpEnum";
import router from "@/router";

const userStore = useUserStore ()

const {username} = userStore.getUserInfo
const formRef = ref<FormInstance> ()
const customPlaceholder = computed ( () => {
  if ( username ) {
    return username
  }
  return "请输入昵称（2-12字）"
} )

const formValue = reactive ( {
  username: '',
} )

function validateNickname() {
  return async (value: string) => {
    const pattern = /^[\u4E00-\u9FA5A-Za-z0-9-_.·]+$/
    if ( !pattern.test ( value ) ) {
      return Promise.resolve ( '请输入正确内容' )
    }
    if ( value.length < 2 || value.length > 12 ) {
      return Promise.resolve ( '长度不符合' )
    }
    return Promise.resolve ( true )
  }
}

function handleNickname() {
  formRef.value
    ?.validate ()
    .then ( async () => {
      try {
        const params = {
          ...userStore.getUserInfo,
          username: formValue.username
        }
        const res = await updateUserInfo ( params )
        if ( res.code ==ResultEnum.SUCCESS ) {
          userStore.setUserInfo ( params )
          router.go ( -1 )
          showSuccessToast ( {
            duration: 300,
              message: '更新成功'
          } )
        }


        // do something
      } finally {
        // after successful
      }
    } )
    .catch ( () => {
      console.error ( '验证失败' )
    } )
}

onMounted ( () => {
  formValue.username = username
} )
</script>

<style scoped lang="less">
.note {
  color: var(--van-text-color-2);
}
</style>
