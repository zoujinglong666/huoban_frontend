<template>
  <div>
    <NavBar>
    </NavBar>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      >
      </van-search>
    </form>

    <div style="padding: 16px 0">
      <van-grid >
        <van-grid-item v-for="(item,index) in activeIds">
          <van-tag closeable size="large" type="primary" @close="handleCloseTag(item,index)">
            {{ item }}
          </van-tag>
        </van-grid-item>
      </van-grid>
    </div>
    <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
    />
    <div class="bottom-0 fixed w-full">
      <van-button type="primary" block @click="handleSearch">搜索</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/Navbar/index.vue'
import router from "@/router";
import {showFailToast} from "vant";

const value = ref ( "" );

const items = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  },

  {
    text: '方向',
    children: [
      {text: 'java', id: 'java'},
      {text: 'vue', id: 'vue'},
      {text: 'react', id: 'react'},
      {text: 'node', id: 'node'},

      {text: 'python', id: 'python'},
      {text: 'go', id: 'go'},
      {text: 'c++', id: 'c++'},
      {text: 'php', id: 'php'},

      {text: 'html', id: 'html'},
      {text: 'css', id: 'css'},
      {text: 'javascript', id: 'javascript'},
      {text: 'typescript', id: 'typescript'},

    ],
  }]

watch ( () => value.value, (n, o) => {
  if ( n ) {
    tagList.value = fuzzySearch ( n )
  } else {
    tagList.value = items
  }
} )
const onCancel = () => {
  value.value = '';
  activeIds.value = [];
  router.back ()
};

function handleCloseTag(item, index) {

  activeIds.value.splice ( index, 1 )

}

const activeIds = ref ( [] );
const activeIndex = ref ( 0 );

const tagList = ref ( items )

function fuzzySearch(keyword) {

  if ( !keyword ) {
    return items;
  }
  const results = [];

  items.forEach ( category => {
    const matchedChildren = category.children.filter ( item =>
      new RegExp ( keyword, 'i' ).test ( item.text ) || new RegExp ( keyword, 'i' ).test ( item.id )
    );

    if ( matchedChildren.length > 0 ) {
      results.push ( {
        text: category.text,
        children: matchedChildren,
      } );
    }
  } );

  return results;
}


async function handleSearch() {
  if ( !activeIds.value.length ) {
    showFailToast ( "请选择相应标签" )
    return
  }


  await router.push ( {
    path: "/search/result",
    query: {
      tagList: activeIds.value
    }
  } )

}


</script>

<style scoped lang="less">
.note {
  color: var(--van-text-color-2);
}
</style>
