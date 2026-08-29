<script setup>
import { ref } from 'vue'
import { techInterview, civilExam } from '../data/interview'

const tab = ref('tech')
</script>

<template>
  <div>
    <el-tabs v-model="tab">
      <el-tab-pane label="🤖 企业算法岗" name="tech" />
      <el-tab-pane label="📝 公务员行测申论" name="civil" />
      <el-tab-pane label="🎓 选调面试" name="xd" />
      <el-tab-pane label="🌍 外企英文面" name="foreign" />
    </el-tabs>

    <!-- 企业算法岗 -->
    <div v-if="tab === 'tech'">
      <div class="qz-card">
        <h3>🧱 技术面通用结构</h3>
        <el-steps direction="vertical" :active="techInterview.structure[0].items.length">
          <el-step v-for="(s, i) in techInterview.structure[0].items" :key="i" :title="`第${i + 1}环节`" :description="s" status="process" />
        </el-steps>
      </div>

      <div class="qz-card">
        <h3>🎤 你的三大方向「讲给面试官」叙事模板</h3>
        <el-collapse>
          <el-collapse-item v-for="n in techInterview.narratives" :key="n.dir" :name="n.dir">
            <template #title><b>{{ n.dir }}</b></template>
            <div class="qz-highlight-box">{{ n.story }}</div>
            <ol style="padding-left: 20px; line-height: 2">
              <li v-for="(p, i) in n.points" :key="i">{{ p }}</li>
            </ol>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="qz-card">
        <h3>📚 基础八股考点清单（按主题自测打勾）</h3>
        <el-row :gutter="16">
          <el-col v-for="b in techInterview.basics" :key="b.topic" :xs="24" :sm="12">
            <div class="topic-box">
              <div class="topic-title">{{ b.topic }}</div>
              <el-checkbox v-for="item in b.items" :key="item" :label="item" style="display: flex; margin-bottom: 4px; white-space: normal">{{ item }}</el-checkbox>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="qz-card">
        <h3>💻 手撕代码与笔试</h3>
        <ul style="line-height: 2.2; padding-left: 20px">
          <li v-for="(c, i) in techInterview.coding" :key="i">{{ c }}</li>
        </ul>
      </div>

      <div class="qz-card">
        <h3>🗣️ HR面高频问题</h3>
        <el-table :data="techInterview.hrInterview" size="small">
          <el-table-column prop="q" label="问题" width="280" />
          <el-table-column prop="a" label="回答思路" />
        </el-table>
      </div>
    </div>

    <!-- 公务员 -->
    <div v-if="tab === 'civil'">
      <div class="qz-card">
        <h3>📐 行测备考策略（博士版）</h3>
        <ul style="line-height: 2.2; padding-left: 20px">
          <li v-for="(x, i) in civilExam.xingce" :key="i">{{ x }}</li>
        </ul>
      </div>
      <div class="qz-card">
        <h3>✍️ 申论备考策略</h3>
        <ul style="line-height: 2.2; padding-left: 20px">
          <li v-for="(x, i) in civilExam.shenlun" :key="i">{{ x }}</li>
        </ul>
      </div>
      <div class="qz-highlight-box">
        备考资源建议：粉笔APP（行测刷题+模考）、华图/中公模块宝典、人民日报评论版APP（申论素材）。
        从现在到国考约3个月：第1个月分模块学方法，第2个月套题限时训练，第3个月模考+申论批改。
      </div>
    </div>

    <!-- 选调面试 -->
    <div v-if="tab === 'xd'">
      <div class="qz-card">
        <h3>🎓 选调面谈/面试要点</h3>
        <ul style="line-height: 2.2; padding-left: 20px">
          <li v-for="(x, i) in civilExam.xuandiaoMianshi" :key="i">{{ x }}</li>
        </ul>
      </div>
      <div class="qz-warning-box">
        提醒：选调面试时间经常在国考笔试前后交错进行，11-12月会出现「一周三考」的极端日程——提前在日历页把各场考试标出来，别撞车。
      </div>
    </div>

    <!-- 外企 -->
    <div v-if="tab === 'foreign'">
      <div class="qz-card">
        <h3>🌍 外企面试攻略</h3>
        <ul style="line-height: 2.2; padding-left: 20px">
          <li v-for="(x, i) in techInterview.foreignCompany" :key="i">{{ x }}</li>
        </ul>
      </div>
      <div class="qz-card">
        <h3>🔤 英文自我介绍骨架（1分钟版）</h3>
        <div class="qz-highlight-box" style="font-family: Consolas, monospace">
          I'm [name], a Ph.D. candidate in [major] at [university], expecting to graduate in [2027].<br />
          My research focuses on trustworthy AI — including [LLM watermarking], [adversarial robustness], and [semantic communication] — which addresses "how to make AI systems reliable in the real world."<br />
          I have published [N] first-author papers at [venues].<br />
          I'm excited about this role because [specific team/product reason], where I can bring both research depth and engineering delivery.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topic-box {
  border: 1px solid var(--qz-card-border);
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 12px;
}
.topic-title { font-weight: 700; margin-bottom: 8px; color: var(--qz-primary); }
</style>
