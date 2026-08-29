<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useStore, todayStr } from './composables/useStore'

const route = useRoute()
const store = useStore()

const menus = [
  { path: '/', title: '作战仪表盘', icon: 'Odometer' },
  { path: '/enterprise', title: '企业赛道', icon: 'OfficeBuilding' },
  { path: '/civil-service', title: '公务员赛道', icon: 'Medal' },
  { path: '/xuandiao', title: '选调赛道', icon: 'Promotion' },
  { path: '/tracker', title: '投递进度看板', icon: 'DataBoard' },
  { path: '/calendar', title: '秋招日历', icon: 'Calendar' },
  { path: '/interview', title: '面试笔试准备', icon: 'EditPen' },
  { path: '/resume', title: '简历与材料', icon: 'Document' },
  { path: '/profile', title: '个人档案', icon: 'User' }
]

const pageTitle = computed(() => route.meta.title || '')
const dateText = computed(() => {
  const d = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
  return `${todayStr()} 星期${week}`
})
</script>

<template>
  <el-container class="qz-layout">
    <el-aside class="qz-aside" width="232px">
      <div class="qz-logo">
        🎯 秋招作战室
        <span class="sub">2027届 · AI方向博士专属</span>
      </div>
      <el-menu
        class="qz-menu"
        background-color="#001529"
        text-color="rgba(255,255,255,0.66)"
        active-text-color="#ffffff"
        :default-active="route.path"
        router
      >
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
          <el-icon><component :is="m.icon" /></el-icon>
          <span>{{ m.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="qz-header" height="56px">
        <div class="title">{{ pageTitle }}</div>
        <div class="date-info">
          今天是 {{ dateText }}
          <el-tag v-if="store.profile.name" size="small" type="primary" effect="plain" style="margin-left: 10px">
            {{ store.profile.name }} · 加油
          </el-tag>
        </div>
      </el-header>
      <el-main class="qz-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
