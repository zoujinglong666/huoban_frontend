<template>
  <vanConfigProvider :theme="getDarkMode" :theme-vars="getThemeVars()">
    <routerView v-slot="{ Component }">
      <div class="absolute bottom-0 top-0 w-full h-screen overflow-hidden">
          <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" />
          </keep-alive>
        <component v-else></component>
      </div>
    </routerView>
  </vanConfigProvider>
</template>

<script setup lang="ts">
import { darken, lighten } from '@/utils'
import { useRouteStore } from '@/store/modules/route'
import { useDesignSetting } from '@/hooks/setting/useDesignSetting'

const routeStore = useRouteStore()
const { getDarkMode, getAppTheme, getIsPageAnimate, getPageAnimateType } = useDesignSetting()

// 需要缓存的路由组件
const keepAliveComponents = computed(() => routeStore.keepAliveComponents)

function getThemeVars() {
  const appTheme = unref(getAppTheme)
  const darkenStr = darken(appTheme, 25)
  const lightenStr = lighten(appTheme, 10)

  return {
    actionSheetCancelTextColor: appTheme,
    buttonPrimaryBackground: appTheme,
    buttonPrimaryBorderColor: appTheme,
    radioCheckedIconColor: appTheme,
    sliderActiveBackground: appTheme,
    cascaderActiveColor: appTheme,
    checkboxCheckedIconColor: appTheme,
    numberKeyboardButtonBackground: appTheme,
    pickerLoadingIconColor: appTheme,
    calendarRangeEdgeBackground: appTheme,
    calendarRangeMiddleColor: appTheme,
    calendarSelectedDayBackground: appTheme,
    stepperButtonRoundThemeColor: appTheme,
    switchOnBackground: appTheme,
    dialogConfirmButtonTextColor: appTheme,
    dropdownMenuOptionActiveColor: appTheme,
    dropdownMenuTitleActiveTextColor: appTheme,
    notifyPrimaryBackground: appTheme,
    circleColor: appTheme,
    noticeBarBackground: lightenStr,
    noticeBarTextColor: darkenStr,
    progressColor: appTheme,
    progressPivotBackground: appTheme,
    stepActiveColor: appTheme,
    stepFinishLineColor: appTheme,
    swipeIndicatorActiveBackground: appTheme,
    tagPrimaryColor: appTheme,
    navBarIconColor: appTheme,
    navBarTextColor: appTheme,
    paginationItemDefaultColor: appTheme,
    sidebarSelectedBorderColor: appTheme,
    tabsDefaultColor: appTheme,
    tabsBottomBarColor: appTheme,
    tabbarItemActiveColor: appTheme,
    treeSelectItemActiveColor: appTheme,
  }

}

const getTransitionName = computed(() => {
  return unref(getIsPageAnimate) ? unref(getPageAnimateType) : undefined
})

function formatDate(dateStr, format="") {
  const date = new Date(dateStr);
  if (!format) format = 'yyyy-MM-dd hh:mm:ss';
  let map = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in map) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (map[k]) : (("00" + map[k]).substr(("" + map[k]).length)));
    }
  }
  return format;
}



console.log (formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))



</script>

<style lang="less">
  @import './styles/index.less';
</style>
