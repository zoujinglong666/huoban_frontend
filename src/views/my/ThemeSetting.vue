<template>
  <div>
    <NavBar/>
    <van-divider>系统主题色</van-divider>
    <div flex="~" justify="center">
      <div grid="~ cols-8 gap-2">
        <span
          v-for="(item, index) in designStore.appThemeList"
          :key="index"
          h="8"
          w="8"
          items-center
          border="2 rounded-md"
          flex="~"
          justify="center"
          :style="{ 'background-color': item }"
          @click="togTheme(item)"
        >
          <i
            v-show="item === designStore.appTheme"
            class="i-ic:sharp-check" text-2xl text-white
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import {useDesignSettingStore} from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
function togTheme(color: string) {
  designStore.appTheme = color
}
</script>

<style scoped lang="less"></style>
