<script setup lang="ts">
import {isFunction, throttle, uniqBy} from "lodash-es";
import {ResultEnum} from "@/enums/httpEnum";
import {watch} from "vue";

const DEFAULT_PAGE_SIZE = 10
const list = ref ( [] );
const loading = ref ( false );
const finished = ref ( false );
const refreshing = ref ( false );
const pageNum = ref ( 1 );
const pages = ref ( 1 );
const total = ref ( 0 )

const onLoad = () => {
  if ( finished.value ) {
    return
  }
  if ( pageNum.value < Number ( pages.value ) ) {
    pageNum.value += 1;
    getData ( pageNum.value )
  }


};

const isLastPage = computed ( () => {
  return pageNum.value >= Number ( pages.value )
} )

watch (
  () => isLastPage.value,
  (newVal) => {
    finished.value = newVal
  },
  {deep: true, immediate: true}
);

const onRefresh = () => {
  refreshing.value = true
  reset ()
  finished.value = false;
  list.value = [];
  emits ( 'update:list', [] )
  getData ( 1 )
};

const reset = () => {
  pageNum.value = 1;
  pages.value = 1;
  total.value = 0;
}

interface DataListPropsType {

  data?: any[];
  // 自定义api
  api?: (params?: {}) => Promise<any>;
  pageSize?: number,
  finishedText?: string,
  successText?: string
  params?: NonNullable<unknown>;
  offset?: number
  rowKey?: string,
  listStyle?: string | object,

}

const props = withDefaults ( defineProps<DataListPropsType> (), {
  finishedText: "没有更多啦",
  successText: "刷新成功",
  rowKey: "id",
  pageSize: 10,
  offset: 100,
} );
const finishedText = computed ( () => {
  return props.finishedText ? props.finishedText : ""
} )

const emits = defineEmits ( ['update:list'] )

const fetchData = async () => {
  if ( props.data?.length ) {
    list.value = (props.data) || [];
    return
  } else {
    await getData ( 1 );
  }
}
onMounted ( async () => {
  await fetchData ()
} )


const getData = async (pageNum: number) => {
  const api = props?.api;
  if ( !api || !isFunction ( api ) ) {
    return;
  }
  try {
    loading.value = true;
    const params = {
      "pageNum": pageNum,
      "pageSize": props.pageSize || DEFAULT_PAGE_SIZE,
      ...(props.params || {}),

    };
    const {data, code} = await api ( params );
    if ( code === ResultEnum.SUCCESS ) {
      pages.value = Number ( data.pages );
      total.value = Number ( data.total );
      const pageData = data.records as any[];
      console.log ( pageData , "pageData" )
      if ( pages.value === 1 || data.total <= props.pageSize ) {
        finished.value = true
        list.value = pageData || []
        emits ( 'update:list', pageData )
        return
      } else {
        list.value = uniqBy ( (list.value ?? []).concat ( pageData ), props.rowKey );

        emits ( 'update:list', list.value )
      }
    }
  } catch (e) {
    console.log ( e )
  } finally {
    refreshing.value = false;
    loading.value = false;
  }
}


const refreshDisabled = ref ( false )
const handleScroll = throttle ( (event) => {
  const {scrollTop, scrollHeight, clientHeight} = event.target
  refreshDisabled.value = scrollTop > 0;
  if ( scrollTop + clientHeight >= scrollHeight - props.offset ) {
    onLoad ()
  }
}, 10 ); // 100毫秒为节流函数的延迟时间

const wrapperRef = ref ( null )
const listRef = ref ( null )
defineExpose ( {
  onLoad,
  onRefresh,
} )
onMounted ( async () => {
  wrapperRef.value && wrapperRef.value?.addEventListener ( 'scroll', handleScroll, {passive: true} )
} )
onUnmounted ( () => {
  wrapperRef.value && wrapperRef.value?.removeEventListener ( 'scroll', handleScroll )
} )


</script>

<template>
  <div :style="props.listStyle" @scroll="handleScroll" ref="wrapperRef">
    <van-pull-refresh :loading="loading"
                      :success-text="props.successText"
                      v-model="refreshing"
                      @refresh="onRefresh"
                      :pullDistance="props.offset"
                      :disable-refresh="refreshDisabled"
    >
      <div  ref="listRef">
        <van-list
          v-bind="$attrs"
          v-model:loading="loading"
          :finished="isLastPage"
          :finished-text="finishedText"
          :offset="props.offset"
          :disabled="true"
          :immediate-check="false"
        >
          <slot :list="list"></slot>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>

</template>

<style scoped lang="less">



</style>
