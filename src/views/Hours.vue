<template>
  <div class="time">
    <a-descriptions title="工作日计算" bordered :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
      <a-descriptions-item label="选择日期间隔">
        <a-range-picker v-model:value="state.timeArr" :locale="locale" format="YYYY-MM-DD" @change="timeChang" :disabledDate="disabledDate" />
      </a-descriptions-item>
      <a-descriptions-item label="计算结果">
        <a-descriptions title="工作日计算" bordered :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
          <a-descriptions-item label="工作日天数（除法定以及周末）"> {{ state.wordDay }}天</a-descriptions-item>
          <a-descriptions-item label="加班10%">{{ state.jx1 }}小时 </a-descriptions-item>
          <a-descriptions-item label="加班20%"> {{ state.jx2 }}小时</a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import axios from 'axios'
const state: any = reactive({
  timeArr: [],
  timeList: [],
  wordDay: 0,
  jx1: 0,
  jx2: 0,
})

const getResult = () => {
  axios({
    method: 'get',
    url: 'https://api.apihubs.cn/holiday/get',
    params: {
      date: state.timeList.join(),
      workday: 2,
      cn: 1,
      size: 100,
    },
  })
    .then(({ data: { data, msg, data: { list } = { list: [] } } }) => {
      if (msg === 'ok') {
        state.wordDay = state.timeList.length - list.length
        state.jx1 = state.wordDay * 8 * 0.1
        state.jx2 = state.wordDay * 8 * 0.2
      } else {
        message.error('请求错误')
      }
    })
    .catch(() => {
      message.error('请求错误')
    })
}
const timeChang = () => {
  if (state.timeArr.length) {
    state.timeList = enumerateDaysBetweenDates(moment(state.timeArr[0]).format('YYYY-MM-DD'), moment(state.timeArr[1]).format('YYYY-MM-DD'))
    getResult()
  } else {
    state.timeList = [null, null]
    state.wordDay = 0
    state.jx1 = 0
    state.jx2 = 0
  }
}

onMounted(() => {
  //   getResult()
  //   console.log(enumerateDaysBetweenDates('2022-04-26', '2022-05-25'))
  //   console.log(Number(moment().add(1, 'year').format('YYYY')))
  //   console.log(Number(moment().format('YYYY')))
  state.timeArr = []
  if (moment().date() >= 26) {
    state.timeArr[0] = moment(`${moment().format('YYYY-MM')}-26`).format()
    state.timeArr[1] = moment(`${moment().add(1, 'months').format('YYYY-MM')}-25`).format()
  } else {
    state.timeArr[0] = moment(`${moment().add(-1, 'months').format('YYYY-MM')}-26`).format()
    state.timeArr[1] = moment(`${moment().format('YYYY-MM')}-25`).format()
  }

  timeChang()
})
/**
 * 获取指定日期天数数组
 * @param startDate 例如2021-06-09
 * @param endDate 例如2021-07-09
 */
const enumerateDaysBetweenDates = (startDate: string, endDate: string) => {
  let daysList = []
  const start = moment(startDate)
  const end = moment(endDate)
  const day = end.diff(start, 'days')
  daysList.push(start.format('YYYYMMDD'))
  for (let i = 1; i <= day; i++) {
    daysList.push(start.add(1, 'days').format('YYYYMMDD'))
  }
  return daysList
}

const disabledDate = (current: any) => {
  //   console.log(moment().add(1, 'year'))
  //   return Number(moment().add(1, 'year').format('YYYY')) < Number(moment().format('YYYY')) //当天之前的不可选，不包括当天
  //return current && current < moment().endOf(‘day');当天之前的不可选，包括当天
  //   return []
}
</script>

<style lang="scss" scoped>
.time {
  width: 90%;
  margin: 0px auto;
  height: 70vh;
  overflow-y: auto;
}
</style>
