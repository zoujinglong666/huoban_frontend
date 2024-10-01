<template>
  <div class="h-screen flex flex-col">
    <van-nav-bar v-if="getShowHeader" :title="getTitle"/>
    <routerView class="flex-1 overflow-x-hidden overflow-y-auto">
      <template #default="{ Component, route }">
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath"/>
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath"/>
      </template>
    </routerView>

    <van-tabbar route class="tabbar">
      <van-tabbar-item
        v-for="menu in getMenus"
        :key="menu.name"
        replace
        :to="menu.path"
      >
        <template #icon>
          <i :class="menu.meta?.icon"/>
        </template>
        {{ menu.meta?.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import type {ComputedRef} from 'vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import {useRouteStore} from '@/store/modules/route'

const routeStore = useRouteStore()
// 需要缓存的路由组件
const keepAliveComponents = computed(() => routeStore.keepAliveComponents)
const currentRoute = useRoute()

const getTitle = computed(() => currentRoute.meta.title as string)

// 菜单
const getMenus: ComputedRef<RouteRecordRaw[]> = computed(() =>
  routeStore.menus.filter((item) => {
    return !item.meta?.innerPage
  }),
)

const getShowHeader = computed(() => !currentRoute.meta.hiddenHeader)
</script>

