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


</script>

<template>

  <div>
    <Navbar></Navbar>
    <page-main>

      <user-card :user-info="item" v-for="(item) in userList" :key="item.id"

      />
    </page-main>
  </div>


</template>

<style scoped lang="less">

</style>
