<template>
  <div class="flex gap-20px flex-col p20px bg-#F6F9F8 min-h-100vh">
    <div class="flex">
      <el-card shadow="hover" class="w100%" header="工作日计算(只包含2022-23年数据)">
        <div class="flex flex-col items-center gap-20px">
          <el-button-group>
            <el-button type="primary" @click="setPreviousMonth">上一月</el-button>
            <el-button type="primary" @click="setCurrentMonth"> 本月 </el-button>
            <el-button type="primary" @click="setNextMonth">下一月</el-button>
          </el-button-group>
          <el-date-picker v-model="state.workDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="default" value-format="YYYY-MM-DD" disabled />
        </div>

        <div class="flex flex-col items-center gap-20px mt-20px">
          <div>
            <span>总工作日：</span>
            <el-tag plain>{{ workDays }} day</el-tag>
          </div>
          <div>
            <span>20%：</span>
            <el-tag plain>{{ duration }} hour</el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <div class="flex items-center gap-20px">
      <div class="flex-1">
        <el-card shadow="hover" header="周内加班时间计算"> developing... </el-card>
      </div>
      <div class="flex-1">
        <el-card shadow="hover" header="周末加班时间计算"> developing... </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { week } from '@/holiday'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

interface StateType {
  workDate: string[]
}

const state: StateType = reactive({
  workDate: [],
})

const setCurrentMonth = () => {
  const year = dayjs().year()

  const month = dayjs().month() + 1

  const day = dayjs().date()

  if (day > 26) {
    const start = dayjs(`${year}-${month}-26`).format('YYYY-MM-DD')
    const end = dayjs(`${year}-${month + 1}-25`).format('YYYY-MM-DD')

    state.workDate = [start, end]
  } else {
    const start = dayjs(`${year}-${month - 1}-26`).format('YYYY-MM-DD')
    const end = dayjs(`${year}-${month}-25`).format('YYYY-MM-DD')

    state.workDate = [start, end]
  }
}
const setNextMonth = () => {
  if (state.workDate.length !== 2) setCurrentMonth()
  else {
    const startDay = dayjs(state.workDate[0]).date()
    const endDay = dayjs(state.workDate[1]).date()
    if (startDay === 26 && endDay === 25) {
      state.workDate[0] = dayjs(state.workDate[0]).add(1, 'month').format('YYYY-MM-DD')
      state.workDate[1] = dayjs(state.workDate[1]).add(1, 'month').format('YYYY-MM-DD')
    } else setCurrentMonth()
  }
}
const setPreviousMonth = () => {
  if (state.workDate.length !== 2) setCurrentMonth()
  else {
    const startDay = dayjs(state.workDate[0]).date()
    const endDay = dayjs(state.workDate[1]).date()
    if (startDay === 26 && endDay === 25) {
      state.workDate[0] = dayjs(state.workDate[0]).subtract(1, 'month').format('YYYY-MM-DD')
      state.workDate[1] = dayjs(state.workDate[1]).subtract(1, 'month').format('YYYY-MM-DD')
    } else setCurrentMonth()
  }
}

const workDays = computed(() => {
  const startDate = dayjs(state.workDate[0])
  const endDate = dayjs(state.workDate[1])
  let days = endDate.diff(startDate, 'day') + 1 // 加 1 是为了包括结束日期

  week.forEach((item) => {
    const excludeDate = dayjs(item.date)
    if (excludeDate.isBetween(startDate, dayjs(endDate), null, '[]')) days -= 1
  })

  return days
})

const duration = computed(() => {
  const hour = workDays.value * 8 * 0.2
  if (hour - Math.floor(hour) <= 0.5 && hour - Math.floor(hour) !== 0) return Math.floor(hour) + 0.5
  else return Math.ceil(hour)
})

setCurrentMonth()
</script>

<style lang="less" scoped>
.a {
  flex-direction: column;
  min-height: fit-content;
}
</style>
