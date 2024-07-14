<template>
  <div class="scroll-wrapper" ref="wrapper" :style="props.listStyle">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span style="font-size: 14px;color: #c8c9cc;">{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <Loading></Loading>
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :pulling="pulling"
      :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown&&bubbleY>0">
          <Bubble :y="bubbleY"></Bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <Loading></Loading>
          </div>
          <div v-else>
            <span style="font-size: 14px;color: #c8c9cc;">{{ refreshTxt }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import BScroll from '@better-scroll/core';
import PullDownRefresh from '@better-scroll/pull-down';
import PullUpLoad from '@better-scroll/pull-up';
import Bubble from './components/Bubble.vue';
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {isFunction, uniqBy} from "lodash-es";
import {ResultEnum} from "@/enums/httpEnum.js";
import {delay} from "@/utils";

BScroll.use ( PullDownRefresh );
BScroll.use ( PullUpLoad );
const props = defineProps ( {
  probeType: {type: Number, default: 0},
  successText: {type: String, default: '刷新成功'},
  rowKey: {type: String, default: 'id'},
  click: {type: Boolean, default: true},
  scrollbar: {type: null, default: false},
  pullDownRefresh: {
    type: null, default: () => {
      return {
        threshold: 100,
        stop: 50,
        txt: '刷新成功',
      }

    }
  },
  pullUpLoad: {
    type: null,
    default: () => {
      return {
        threshold: 50,
        txt: {
          more: '加载更多...',
          noMore: '没有更多了',
        },
      }

    }
  },
  startY: {type: Number, default: 0},
  refreshDelay: {type: Number, default: 50},
  pageSize: {type: Number, default: 10},
  freeScroll: {type: Boolean, default: false},
  options: {
    type: Object,
    default: () => ({}),
  }, params: {
    type: Object,
    default: () => ({}),
  },
  api: {
    type: Function,
    default: () => Promise<any>
  },
  listStyle: {
    type: Object,
    default: () => {
      return {}
    }
  }

} );

const DEFAULT_PAGE_SIZE = 10
const list = ref ( [] );
const finished = ref ( false );
const pageNum = ref ( 1 );
const pages = ref ( 1 );
const total = ref ( 0 )

const beforePullDown = ref ( true );
const isRebounding = ref ( false );
const isPullingDown = ref ( false );
const pulling = ref ( false );
const isPullUpLoad = ref ( false );
const pullUpDirty = ref ( false );
const pullDownStyle = ref ( '' );
const bubbleY = ref ( 0 );
const reboundPullDownTimer = ref ( null );
const afterPullDownTimer = ref ( null );
const pullDownInitTop = ref ( -50 );

const pullUpTxt = computed ( () => {
  const moreTxt = props.pullUpLoad?.txt?.more || 'loading.more';
  const noMoreTxt = props.pullUpLoad?.txt?.noMore || 'no.more';
  return pullUpDirty.value ? moreTxt : noMoreTxt;
} );
const refreshTxt = computed ( () => props.pullDownRefresh?.txt || 'Refresh successful' );
const wrapper = ref ( null );
const scroll = ref ( null );
const loading = ref ( false );

onMounted ( () => {
  nextTick ( () => {

    setTimeout ( () => {
      const WrapperEl = wrapper.value;
      const firstChild = WrapperEl?.firstElementChild;
      if ( firstChild ) {
        const grandFirstChild = firstChild.firstElementChild;
        if ( grandFirstChild ) {
          grandFirstChild.style.minHeight = `${WrapperEl.offsetHeight}px`;
        }
      }
    }, 0 )
    initScroll ();
    fetchData ();
  } );
} );

const emit = defineEmits ( ['scroll', 'before-scroll-start', 'pulling-up', 'pulling-down', "update:list"] );
const fetchData = async () => {
  await getData ( 1 );
}


const getData = async (pageNum: number, isRefresh?: boolean) => {
  const api = props?.api;
  if ( !api || !isFunction ( api ) ) {
    return;
  }
  try {
    const params = {
      ...(props.params || {}),
      "pageNum": pageNum,
      "pageSize": props.pageSize || DEFAULT_PAGE_SIZE
    };
    if ( isRefresh ) {
      const {data, code} = await api ( params );
      if ( code === ResultEnum.SUCCESS ) {
        pages.value = Number ( data.pages );
        total.value = Number ( data.total );
        const pageData = data.records as any[];
        if ( pages.value === 1 || data.total <= props.pageSize ) {
          finished.value = true
        }
        list.value = pageData || []
        emit ( 'update:list', pageData )
        return
      }
    } else {
      const {data, code} = await api ( params );
      if ( code === ResultEnum.SUCCESS ) {
        pages.value = Number ( data.pages );
        total.value = Number ( data.total );
        const pageData = data.records as any[];
        if ( pages.value === 1 || data.total <= props.pageSize ) {
          finished.value = true
          list.value = pageData || []
          emit ( 'update:list', pageData )
          return
        } else {
          list.value = uniqBy ( (list.value ?? []).concat ( pageData ), props.rowKey );
          emit ( 'update:list', list.value )
        }
      }
    }


  } catch (e) {
    console.log ( e )
  } finally {
  }
}


function initScroll() {
  if ( !wrapper.value ) return;
  const options = {
    ...props.options,
    probeType: props.probeType,
    click: true,
    tap: true,
    scrollY: true,
    scrollX: false,
    pullDownRefresh: props.pullDownRefresh,
    pullUpLoad: props.pullUpLoad,
    scrollbar: {
      fade: true,
      interactive: false,
      shrink: false,
      speed: 40,
      damping: 0.1,
    },
    bounce: {
      top: true,
      bottom: true,
      left: true,
      right: true
    }
  };
  scroll.value = new BScroll ( wrapper.value, options );
  if ( props.pullDownRefresh ) _initPullDownRefresh ();
  if ( props.pullUpLoad ) _initPullUpLoad ();
}

function forceUpdate(dirty) {
  nextTick ( () => {
    pullUpDirty.value = dirty;
    if ( props.pullDownRefresh && isPullingDown.value ) {
      pulling.value = true;
      _reboundPullDown ().then ( _afterPullDown );
    } else if ( props.pullUpLoad ) {
      isPullUpLoad.value = false;
      finishPullUp ();
      refresh ();
    } else {
      refresh ();
    }
  } );
}

function _initPullDownRefresh() {
  scroll.value.on ( 'pullingDown', () => {
    beforePullDown.value = false;
    isPullingDown.value = true;
    pulling.value = true;
    onRefresh ();
    emit ( 'pulling-down' );
    pulling.value = false;
  } );

  scroll.value.on ( 'scroll', (pos) => {

    if(pos.y===0){
      return
    }

    if ( beforePullDown.value ) {
      bubbleY.value = Math.max ( 0, pos.y + pullDownInitTop.value );
      pullDownStyle.value = `top:${Math.min ( pos.y + pullDownInitTop.value, 10 )}px`;
    } else {
      bubbleY.value = 0;
      pullDownStyle.value = `top:${Math.max ( pos.y - props.pullDownRefresh.stop, 10 )}px`;
    }

    if ( isRebounding.value ) {
      pullDownStyle.value = `top:${10 - (props.pullDownRefresh.stop - pos.y)}px`;
    }  // 监听向上滑动，立即隐藏刷新成功的字样
    if ( pos.y < 0 && !beforePullDown.value ) {
      beforePullDown.value = false;
    }
    if ( pos.y < 0  ) {
      scroll.value && scroll.value?.scrollTo (0, 0, 300);
    }


  } );
}

function _initPullUpLoad() {
  scroll.value.on ( 'pullingUp', () => {
    if ( pullUpDirty.value ) {
      isPullUpLoad.value = true;
      delay ( 500 ).then ( () => {
        onLoadMore ();
        emit ( 'pulling-up' );
      } )
    }
  } );
}

function _reboundPullDown() {
  const {stopTime = 600} = props.pullDownRefresh;
  return new Promise ( (resolve) => {
    reboundPullDownTimer.value = setTimeout ( () => {
      isRebounding.value = true;
      isPullingDown.value = false;
      finishPullUp ();
      finishPullDown ();
      resolve ();
    }, stopTime );
  } );
}

const bounceTime = computed ( () => scroll.value?.options.bounceTime );

function _afterPullDown() {
  afterPullDownTimer.value = setTimeout ( () => {
    pullDownStyle.value = `top:${pullDownInitTop.value}px`;
    beforePullDown.value = true;
    isRebounding.value = false;
    pulling.value = false
    refresh ();
  }, bounceTime.value );
}

function finishPullUp() {
  scroll.value && scroll.value?.finishPullUp ();
}

function finishPullDown() {
  scroll.value && scroll.value?.finishPullDown ();
}

function refresh() {
  scroll.value && scroll.value?.refresh ();
}


function destroy() {
  scroll.value && scroll.value?.destroy ();
  clearTimeout ( reboundPullDownTimer.value );
  clearTimeout ( afterPullDownTimer.value );
}


onBeforeUnmount ( () => {
  destroy ();
  scroll.value = null;
} );


const onRefresh = () => {
  reset ()
  getData ( 1, true )
};
const reset = () => {
  pageNum.value = 1;
  pages.value = 1;
  total.value = 0;
  finished.value = false;

  // list.value = [];
  // emit('update:list', [])
}
const onLoadMore = () => {
  if ( finished.value ) {
    return
  }
  pageNum.value += 1;
  getData ( pageNum.value, false )
  if ( pageNum.value >= Number ( pages.value ) ) {
    finished.value = true;
  }
};


const listWrapper = ref ( null )


onActivated ( () => {
  nextTick ( () => {
    if ( !scroll.value ) {
      scroll.value = new BScroll ( wrapper.value, props.options )
    } else {
      refresh ()
    }
  } )
} );


watch (
  () => list.value,
  (newItems, oldItems) => {
    if ( newItems.length !== 0 && newItems !== oldItems ) {
      nextTick ( async () => {
        await delay ( props.refreshDelay )
        forceUpdate ( !finished.value );
      } )

    }
  },
  {deep: true}
);


defineExpose ( {
  refresh, fetchData
} );

</script>

<style scoped lang="less">
.scroll-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}


.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
}

.pulldown-wrapper .after-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


:deep(.bscroll-indicator) {
  box-sizing: border-box;
  position: absolute;
  background: rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  width: 100%;
  height: 109px;
  transform: translateY(442px) translateZ(1px);
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
}

:deep(.bscroll-vertical-scrollbar) {
  position: absolute;
  z-index: 9999;
  overflow: hidden;
  width: 5px !important;
  bottom: 2px;
  top: 2px;
  right: 1px;
  pointer-events: none;
  opacity: 0;
  display: block;
  transition-duration: 500ms;
}


</style>
