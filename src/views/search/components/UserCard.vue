<script setup lang="ts">

const props=defineProps({
  userInfo:{
    type:Object,
    default:()=>{
      return {}
    }
  }
})


const tags=computed(()=>{
  return props.userInfo.tags?JSON.parse(props.userInfo.tags):[]
})


</script>

<template>

  <div class="user-card">
    <div class="user-card_left">
      <van-image
        width="80px"
        height="80px"
        fit="cover"
        radius="8"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />

    </div>

    <div class="user-card_right">
      <div>
        <div>{{props.userInfo.username||props.userInfo.userAccount}}</div>
        <div>
          <van-tag type="primary" style="margin-right: 8px" v-for="tag in tags" :key="tag">{{tag}}</van-tag>
        </div>
      </div>
      <div>
        <van-button type="primary" size="mini" plain p-6>联系我</van-button>
      </div>
    </div>


  </div>

</template>

<style scoped lang="less">


.user-card{
  box-sizing: border-box;
  width: 100%;
  height: 96px;
  border-radius: 8px;
  background:#fff;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;


  &_right{
    display: flex;
    justify-content: space-between;
    flex: 1;

    margin-left: 8px;

  }
}

</style>
