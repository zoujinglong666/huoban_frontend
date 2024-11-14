<template>
  <div ref="wrapper" class="ct-scroll-wrapper">
    <div class="ct-scroll-content">
      <div ref="listWrapper" class="ct-scroll-list-wrapper">
        <slot>
          <ul class="cube-scroll-list">
            <li
              style="height: 100px;line-height: 100px;text-align: center;"
              v-for="(item, index) in data"
              :key="index"
              @click="clickItem(item)">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="ct-pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <div v-if="pullDownRefresh" class="ct-pulldown" ref="pulldown">
      <slot
        name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownStyle="pullDownStyle"
        :beforePullDown="beforePullDown"
        :isPullingDown="isPullingDown"
        :bubbleY="bubbleY">
        <div class="ct-pulldown-wrapper" :style="pullDownStyle">
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
  </div>
</template>

<script>
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue';
import BScroll from '@better-scroll/core';
import PullDownRefresh from '@better-scroll/pull-down';
import PullUpLoad from '@better-scroll/pull-up';
import Loading from '@/components/DataScroll/components/Loading.vue';
import Bubble from '@/components/DataScroll/components/Bubble.vue';
import {camelize, getRect, USE_TRANSITION} from '@/components/CScroll/utils';

BScroll.use(PullDownRefresh);
BScroll.use(PullUpLoad);
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';
const DEFAULT_REFRESH_TXT = 'Refresh success';
const DEFAULT_STOP_TIME = 600;

const EVENT_CLICK = 'click';
const EVENT_PULLING_DOWN = 'pulling-down';
const EVENT_PULLING_UP = 'pulling-up';

const EVENT_SCROLL = 'scroll';
const EVENT_BEFORE_SCROLL_START = 'before-scroll-start';
const EVENT_SCROLL_END = 'scroll-end';

const NEST_MODE_NONE = 'none';
const NEST_MODE_NATIVE = 'native';

const SCROLL_EVENTS = [EVENT_SCROLL, EVENT_BEFORE_SCROLL_START, EVENT_SCROLL_END];


const DEFAULT_OPTIONS = {
  observeDOM: true,
  click: true,
  probeType: 1,
  scrollbar: false,
  pullDownRefresh: true,
  pullUpLoad: true
};

export default defineComponent({
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    scrollEvents: {
      type: Array,
      default() {
        return [];
      },
    },
    listenScroll: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'scroll-events'
      }
    },
    listenBeforeScroll: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'scroll-events'
      }
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    nestMode: {
      type: String,
      default: NEST_MODE_NONE
    },
  },
  setup(props, {emit}) {
    const wrapper = ref(null);
    const listWrapper = ref(null);
    const pulldown = ref(null);
    const scroll = ref(null);
    const beforePullDown = ref(false);
    const isPullingDown = ref(false);
    const isPullUpLoad = ref(false);
    const pullUpNoMore = ref(false);
    const bubbleY = ref(0);
    const pullDownStyle = ref('');
    const pullDownStop = ref(40);
    const pullDownHeight = ref(60);
    const pullUpHeight = ref(0);
    const resetPullDownTimer = ref(null);
    const touchStartMoment = ref(false);
    const isPullDownUpdating = ref(false);

    const pullDownRefresh = computed(() => {
      let pullDownRefresh = props.options.pullDownRefresh ?? {};
      return Object.assign({stop: pullDownStop.value}, pullDownRefresh);
    });

    const pullUpLoad = computed(() => {
      return props.options.pullUpLoad;
    });

    const pullUpTxt = computed(() => {
      const pullUpLoad = props.options.pullUpLoad;
      const txt = pullUpLoad && pullUpLoad.txt;
      const moreTxt = (txt && txt.more) || '';
      const noMoreTxt = (txt && txt.noMore) || '';
      return pullUpNoMore.value ? noMoreTxt : moreTxt;
    });

    const refreshTxt = computed(() => {

      return DEFAULT_REFRESH_TXT;
      // const pullDownRefresh = props.options.pullDownRefresh;
      // return (pullDownRefresh && pullDownRefresh.txt.loading) || DEFAULT_REFRESH_TXT;
    });

    const finalScrollEvents = computed(() => {
      const finalScrollEvents = props.scrollEvents.slice();
      if (!finalScrollEvents.length) {
        props.listenScroll && finalScrollEvents.push(EVENT_SCROLL);
        props.listenBeforeScroll && finalScrollEvents.push(EVENT_BEFORE_SCROLL_START);
      }
      return finalScrollEvents;
    });

    const needListenScroll = computed(() => {
      return finalScrollEvents.value.indexOf(EVENT_SCROLL) !== -1;
    });
    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          forceUpdate(true);
        }, props.refreshDelay);
      }
    );

    watch(
      () => pullDownRefresh.value,
      (newVal, oldVal) => {
        if (newVal) {
          scroll.value?.openPullDown(newVal);
          if (!oldVal) {
            _onPullDownRefresh();
            _pullDownRefreshChangeHandler();
          }
        }

        if (!newVal && oldVal) {
          scroll.value?.closePullDown();
          _offPullDownRefresh();
          _pullDownRefreshChangeHandler();
        }
      },
      {deep: true}
    );

    watch(
      () => pullUpLoad.value,
      (newVal, oldVal) => {
        if (newVal) {
          scroll.value.openPullUp(newVal);
          if (!oldVal) {
            _onPullUpLoad();
            _pullUpLoadChangeHandler();
          }
        }

        if (!newVal && oldVal) {
          scroll.value.closePullUp();
          _offPullUpLoad();
          _pullUpLoadChangeHandler();
        }
      },
      {deep: true}
    );

    onMounted(() => {
      nextTick(() => {
        initScroll();
      });
    });

    onBeforeUnmount(() => {
      destroy();
    });

    const initScroll = () => {
      if (!wrapper.value) {
        return;
      }
      _calculateMinHeight();
      let dynamicOptions = {
        scrollY: props.direction === DIRECTION_V,
        scrollX: props.direction === DIRECTION_H,
        probeType: needListenScroll.value ? 3 : 1,
        useTransition: USE_TRANSITION
      };
      let options = Object.assign({}, DEFAULT_OPTIONS, dynamicOptions, props.options);

      scroll.value = new BScroll(wrapper.value, options);

      props.parentScroll && props.nestMode !== NEST_MODE_NONE && _handleNestScroll();

      _listenScrollEvents();

      if (pullDownRefresh.value) {
        _onPullDownRefresh();
        _pullDownRefreshChangeHandler();
      }

      if (pullUpLoad.value) {
        _onPullUpLoad();
        _pullUpLoadChangeHandler();
      }
    };

    const disable = () => {
      scroll.value && scroll.value.disable();
    };

    const enable = () => {
      scroll.value && scroll.value.enable();
    };

    const refresh = () => {
      _calculateMinHeight();
      scroll.value && scroll.value.refresh();
    };

    const destroy = () => {
      scroll.value && scroll.value.destroy();
      scroll.value = null;
    };

    const scrollTo = () => {
      scroll.value && scroll.value.scrollTo.apply(scroll.value, arguments);
    };

    const scrollToElement = () => {
      scroll.value && scroll.value.scrollToElement.apply(scroll.value, arguments);
    };

    const clickItem = (item) => {
      emit(EVENT_CLICK, item);
    };

    const forceUpdate = async (dirty = false, nomore = false) => {
      if (isPullDownUpdating.value) {
        return;
      }
      if (pullDownRefresh.value && isPullingDown.value) {
        isPullingDown.value = false;
        isPullDownUpdating.value = true;
        await _waitFinishPullDown();
        isPullDownUpdating.value = false;
        await _waitResetPullDown(dirty);
      } else if (pullUpLoad.value && isPullUpLoad.value) {
        isPullUpLoad.value = false;
        scroll.value.finishPullUp();
        pullUpNoMore.value = !dirty || nomore;
      }
      dirty && refresh();
    };

    const resetPullUpTxt = () => {
      pullUpNoMore.value = false;
    };

    const _listenScrollEvents = () => {
      finalScrollEvents.value.forEach((event) => {
        console.log(event, "event")
        scroll.value.on(camelize(event), (...args) => {
          emit(event, ...args);
        });
      });
    };

    const _handleNestScroll = () => {
      nextTick(() => {
        const innerScroll = scroll.value;
        const outerScroll = props.parentScroll.scroll;
        console.log(outerScroll, "outerScroll")
        const scrolls = [innerScroll, outerScroll];
        scrolls.forEach((scroll, index, arr) => {
          scroll.on('touchEnd', () => {
            outerScroll.enable();
            innerScroll.enable();
            innerScroll.initiated = false;
          });

          scroll.on('beforeScrollStart', () => {
            touchStartMoment.value = true;
            const anotherScroll = arr[(index + 1) % 2];
            anotherScroll.stop();
            anotherScroll.resetPosition();
          });
        });

        innerScroll.on('scroll', (pos) => {
          if (!innerScroll.initiated || innerScroll.isInTransition) {
            return;
          }

          if (props.nestMode === NEST_MODE_NATIVE && !touchStartMoment.value) {
            return;
          }

          const reachBoundary = _checkReachBoundary(pos);
          if (reachBoundary) {
            innerScroll.resetPosition();
            innerScroll.disable();
            outerScroll.pointX = innerScroll.pointX;
            outerScroll.pointY = innerScroll.pointY;
            outerScroll.enable();
          } else {
            outerScroll.disable();
          }
          touchStartMoment.value = false;
        });
      });
    };

    const _checkReachBoundary = (pos) => {
      const distX = scroll.value.distX;
      const distY = scroll.value.distY;
      const reachBoundaryX = distX > 0 ? pos.x >= scroll.value.minScrollX : distX < 0 ? pos.x <= scroll.value.maxScrollX : false;
      const reachBoundaryY = distY > 0 ? pos.y >= scroll.value.minScrollY : distY < 0 ? pos.y <= scroll.value.maxScrollY : false;
      const freeScroll = scroll.value.freeScroll;
      const hasHorizontalScroll = scroll.value.hasHorizontalScroll;
      const hasVerticalScroll = scroll.value.hasVerticalScroll;

      if (!hasHorizontalScroll && !hasVerticalScroll) {
        return true;
      }

      if (freeScroll) {
        return reachBoundaryX || reachBoundaryY;
      }

      let reachBoundary;
      if (scroll.value.movingDirectionX) {
        reachBoundary = reachBoundaryX;
      } else if (scroll.value.movingDirectionY) {
        reachBoundary = reachBoundaryY;
      }
      return reachBoundary;
    };

    const _calculateMinHeight = () => {
      let minHeight = 0;
      if (pullDownRefresh.value || pullUpLoad.value) {
        const wrapperHeight = getRect(wrapper.value).height;
        minHeight = wrapperHeight + 1;
        if (pullUpLoad && pullUpLoad.visible) {
          minHeight -= pullUpHeight.value;
        }
      }
      listWrapper.value.style.minHeight = `${minHeight}px`;
    };

    const _onPullDownRefresh = () => {
      scroll.value.on('pullingDown', _pullDownHandle);
      scroll.value.on('scroll', _pullDownScrollHandle);
    };

    const _offPullDownRefresh = () => {
      scroll.value.off('pullingDown', _pullDownHandle);
      scroll.value.off('scroll', _pullDownScrollHandle);
    };

    const _pullDownRefreshChangeHandler = () => {
      nextTick(() => {
        _getPullDownEleHeight();
        _calculateMinHeight();
      });
    };

    const _pullDownHandle = () => {
      if (resetPullDownTimer.value) {
        clearTimeout(resetPullDownTimer.value);
      }
      beforePullDown.value = false;
      isPullingDown.value = true;
      emit(EVENT_PULLING_DOWN);
    };

    const _pullDownScrollHandle = (pos) => {

      if (beforePullDown.value) {
        bubbleY.value = Math.max(0, pos.y - pullDownHeight.value);
        pullDownStyle.value = `top:${Math.min(pos.y - pullDownHeight.value, 0)}px`;
      } else {
        bubbleY.value = 0;
        pullDownStyle.value = `top:${Math.min(pos.y - pullDownStop.value, 0)}px`;
      }
    };
    const _pullUpLoadChangeHandler = () => {
      nextTick(() => {
        _getPullUpEleHeight();
        _calculateMinHeight();
      });
    };

    const _onPullUpLoad = () => {
      scroll.value.on('pullingUp', _pullUpHandle);
    };

    const _offPullUpLoad = () => {
      scroll.value.off('pullingUp', _pullUpHandle);
    };

    const _pullUpHandle = () => {
      isPullUpLoad.value = true;
      emit(EVENT_PULLING_UP);
    };

    const _waitFinishPullDown = (next) => {
      const {stopTime = DEFAULT_STOP_TIME} = props.options.pullDownRefresh;
      return new Promise((resolve) => {
        setTimeout(() => {
          scroll.value && scroll.value.finishPullDown();
          resolve();
        }, stopTime);
      });
    };

    const _waitResetPullDown = (dirty) => {
      return new Promise((resolve) => {
        resetPullDownTimer.value = setTimeout(() => {
          pullDownStyle.value = `top: -${pullDownHeight.value}px`;
          beforePullDown.value = true;
          resolve();
        }, scroll.value && scroll.value.options.bounceTime);
      });
    };

    const _getPullDownEleHeight = () => {
      if (!pulldown.value) {
        return;
      }
      pullDownHeight.value = getRect(pulldown.value).height;
      beforePullDown.value = false;
      isPullingDown.value = true;
      nextTick(() => {
        pullDownStop.value = getRect(pulldown.value).height;
        beforePullDown.value = false;
        isPullingDown.value = false;
      });
    };

    const _getPullUpEleHeight = () => {
      nextTick(() => {
        const pullup = listWrapper.value.nextElementSibling;
        if (!pullup) {
          pullUpHeight.value = 0;
          return;
        }
        pullUpHeight.value = getRect(pullup).height;
      });

    };

    return {
      wrapper,
      listWrapper,
      pulldown,
      beforePullDown,
      isPullingDown,
      isPullUpLoad,
      pullUpNoMore,
      bubbleY,
      pullDownStyle,
      pullDownStop,
      pullDownHeight,
      pullUpHeight,
      pullDownRefresh,
      pullUpLoad,
      pullUpTxt,
      refreshTxt,
      finalScrollEvents,
      needListenScroll,
      initScroll,
      disable,
      enable,
      refresh,
      destroy,
      scrollTo,
      scrollToElement,
      clickItem,
      forceUpdate,
      resetPullUpTxt
    };
  },
  components: {
    Loading,
    Bubble
  }
});
</script>

<style lang="less" scoped>

.ct-scroll-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.ct-scroll-list-wrapper {
  overflow: hidden;
}

.ct-pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;

  .before-trigger {
    height: 54px;
    line-height: 0;
    padding-top: 6px;
  }

  .after-trigger {
    .loading {
      padding: 8px 0;
    }

    .ct-pulldown-loaded {
      padding: 12px 0;
    }
  }
}

.ct-pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .before-trigger {
    padding: 22px 0;
    min-height: 1em;
  }

  .after-trigger {
    padding: 19px 0;
  }
}

.ct-scroll-content {
  position: relative;
  z-index: 1;
}


</style>

