<script setup lang="ts">
import {searchTags} from "@/api/modules/login";
import {ResultEnum} from "@/enums/httpEnum";
import UserCard from "@/views/search/components/UserCard.vue";

const route = useRoute ()


const tagList = computed ( () => {
  return route.query.tagList ? route.query.tagList : []
} )

const userList = ref ( [] )
const getSearchTagList = async () => {

  if ( tagList.value.length === 0 ) {
    return
  }
  const params = {
    tagList: tagList.value
  }
  console.log ( params )

  const res = await searchTags ( params )
  if ( res.code == ResultEnum.SUCCESS ) {
    userList.value = res.data || []
  }
}
onMounted ( () => {
  getSearchTagList ()
} )
const router = useRouter ()
const back = () => {
  router.go(-1)
}

</script>

<template>

  <div>
    <Navbar></Navbar>
    <page-main>

      <user-card :user-info="item" v-for="(item) in userList" :key="item.id"

      />
      <van-empty description="暂无数据" image="search">
        <van-button round type="primary" @click="back" class="back-button">返回</van-button>
      </van-empty>
    </page-main>
  </div>


</template>

<style scoped lang="less">
.back-button {
  width: 160px;
  height: 40px;
}
</style>
