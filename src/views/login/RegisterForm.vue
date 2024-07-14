<template>
  <van-form v-if="getShow" ref="formRef" class="flex flex-col" @submit="handleRegister">
    <van-cell-group inset class="enter-y !mx-0 !mb-10">
      <van-field
        v-model="formData.userAccount"
        class="enter-y items-center !rounded-md"
        name="username"
        placeholder="用户名"
        :rules="getFormRules.userAccount"
      >
        <template #left-icon>
          <i class="i-ph:user-bold mr-2 text-lg" />
        </template>
      </van-field>
      <van-field
        v-model="formData.userPassword"
        class="enter-y items-center !rounded-md"
        :type="switchPassType ? 'password' : 'text'"
        name="password"
        placeholder="密码"
        :rules="getFormRules.userPassword"
        @click-right-icon="switchPassType = !switchPassType"
      >
        <template #left-icon>
          <i class="i-iconamoon:lock-bold mr-2 text-lg" />
        </template>
        <template #right-icon>
          <i v-if="switchPassType" class="i-mdi:eye-outline mr-2 text-lg" />
          <i v-else class="i-mdi:eye-off mr-2 text-lg" />
        </template>
      </van-field>

      <van-field
        v-model="formData.checkPassword"
        class="enter-y items-center !rounded-md"
        :type="switchConfirmPassType ? 'password' : 'text'"
        name="confirmPassword"
        placeholder="确认密码"
        :rules="getFormRules.checkPassword"
        @click-right-icon="switchConfirmPassType = !switchConfirmPassType"
      >
        <template #left-icon>
          <i class="i-iconamoon:lock-bold mr-2 text-lg" />
        </template>
        <template #right-icon>
          <i v-if="switchConfirmPassType" class="i-mdi:eye-outline mr-2 text-lg" />
          <i v-else class="i-mdi:eye-off mr-2 text-lg" />
        </template>
      </van-field>
    </van-cell-group>
    <van-button
      class="enter-y !mb-4 !rounded-md"
      type="primary"
      block
      native-type="submit"
      :loading="loading"
    >
      注 册
    </van-button>

    <van-button
      class="enter-y !rounded-md"
      plain
      type="primary"
      block
      @click="handleBackLogin"
    >
      返 回
    </van-button>
  </van-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'

import { LoginStateEnum, useFormRules, useLoginState } from './useLogin'
import {userRegistration} from "@/api/login";
import {userRegistrationApi} from "@/api/modules/login";

const { handleBackLogin, getLoginState } = useLoginState()
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const loading = ref(false)
const formRef = ref<FormInstance>()

const formData = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const { getFormRules } = useFormRules(formData)

const switchPassType = ref(true)
const switchConfirmPassType = ref(true)

function handleRegister() {
  formRef.value
    ?.validate()
    .then(async () => {
      try {
        loading.value = true

        const params={
          ...formData
        }

        const res=await userRegistrationApi(params)
      }
      finally {
        loading.value = false
      }
    })
    .catch(() => {
      console.error('验证失败')
    })
}
</script>

<style scoped lang="less"></style>
