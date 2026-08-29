import { reactive, watch } from 'vue'

/**
 * 个人数据统一存储：全部保存在浏览器 localStorage。
 * 招聘内容类数据在 src/data/ 下（随代码更新），个人数据只在本机浏览器里。
 * 换电脑/清缓存前，请在「个人档案」页导出 JSON 备份。
 */

const STORAGE_KEY = 'qiuzhao2027_store_v1'

function defaultState() {
  return {
    profile: {
      name: '',
      school: '',
      college: '',
      major: '',
      // 政治面貌：中共党员 / 中共预备党员 / 共青团员 / 群众
      political: '',
      // 双一流建设高校（定向选调主要面向范围）
      isDoubleFirstClass: null, // true / false / null(未填写)
      originProvince: '',
      targetCities: ['北京', '上海', '杭州', '苏州', '南京'],
      hasCadreExp: null,      // 学生干部经历
      hasAwards: null,        // 校级以上奖项/奖学金
      thesisCount: 0,         // 已发表/在投论文数
      notes: ''
    },
    applications: [], // 投递记录，见 Tracker.vue
    customEvents: [], // 自定义日历事件 {id,title,date,track,note}
    checklistDone: {} // 材料清单勾选 { '材料id': true }
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const saved = JSON.parse(raw)
    // 简单合并，防止旧版本缺字段
    const base = defaultState()
    return { ...base, ...saved, profile: { ...base.profile, ...(saved.profile || {}) } }
  } catch (e) {
    console.warn('本地数据读取失败，使用默认值', e)
    return defaultState()
  }
}

const state = reactive(load())

watch(state, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  } catch (e) {
    console.warn('本地数据保存失败', e)
  }
}, { deep: true })

export function useStore() {
  return state
}

export function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `秋招数据备份_${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(jsonText) {
  const data = JSON.parse(jsonText)
  const base = defaultState()
  const merged = { ...base, ...data, profile: { ...base.profile, ...(data.profile || {}) } }
  Object.assign(state, merged)
}

export function resetData() {
  Object.assign(state, defaultState())
}

// —— 通用工具 ——
export function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.round((target - now) / 86400000)
}

let uid = Date.now()
export function genId() {
  return `${Date.now()}_${uid++}`
}
