<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
      @click="handelClick"
    />
    <ScrollList v-model:list="recommendedUserList" :api="recommendedUsers">
      <user-card :user-info="item" v-for="(item,index) in recommendedUserList" :key="item.id"
      />
    </ScrollList>
  </div>
</template>

<script setup lang="ts" name="DashboardPage">
import router from "@/router";
import {recommendedUsers} from "@/api/modules/login";
import UserCard from "@/views/search/components/UserCard.vue";

defineOptions({
  name: 'DashboardPage',
})

const value = ref('')

const handelClick = () => {
  router.push("/search/index")
}
const recommendedUserList = ref([])


</script>

<style scoped lang="less"></style>
