<template>
  <div class="time">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="weekdays">
        <template #tab>
          <span>
            <FreeIcon type="free-gongzuotai"></FreeIcon>
            工作日
          </span>
        </template>
        <a-form :model="formState" :labelCol="{ span: 10 }" :wrapperCol="{ span: 12 }">
          <a-form-item label="请输入上班时间">
            <a-time-picker
              v-model:value="formState.startTime"
              placeholder="上班时间"
              :allowClear="false"
              :disabledHours="
                () => {
                  return [0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                }
              "
            />
          </a-form-item>
          <a-form-item label="请输入加班时长">
            <a-input-number v-model:value="formState.overtimeHours" :min="0" :step="0.5" :formatter="(value:any) => `${value}小时`" :parser="(value:any) => value.replace(/小时/g, '') - 0" />
          </a-form-item>
          <a-form-item label="正常下班时间">
            <span v-text="resultTime" style="font-size: 18px; font-weight: bold"></span>
          </a-form-item>
          <a-form-item label="加班下班时间">
            <span v-text="addWorkResultTime" style="font-size: 18px; font-weight: bold"></span>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="weekend">
        <template #tab>
          <span>
            <FreeIcon type="free-xiuxi"></FreeIcon>
            周末
          </span>
        </template>
        <a-form :model="formState" :labelCol="{ span: 10 }" :wrapperCol="{ span: 12 }">
          <a-form-item label="请输入上班时间">
            <a-time-picker
              v-model:value="formState.startTime"
              placeholder="上班时间"
              :allowClear="false"
              :disabledHours="
                () => {
                  return [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23]
                }
              "
            />
          </a-form-item>
          <a-form-item label="请输入加班时长">
            <a-input-number v-model:value="formState.overtimeHoursEnd" :min="4" :step="0.5" :formatter="(value:any) => `${value}小时`" :parser="(value:any) => value.replace(/小时/g, '') - 0" />
          </a-form-item>
          <a-form-item label="加班下班时间">
            <span v-text="addWorkResultTimeEnd" style="font-size: 18px; font-weight: bold"></span>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import moment, { Moment } from 'moment'
import { computed, reactive, ref, UnwrapRef, Ref } from 'vue'
import { FreeIcon } from '@/uitils/icons'

interface FormState {
  startTime: Moment | null
  overtimeHours: number
  overtimeHoursEnd: number
}
/* 周内 */
const resultTime = computed(() => {
  if (moment(formState.startTime).get('hours') === 8 && moment(formState.startTime).get('minutes') < 30) {
    return moment('8:30:00', 'hh:mm:ss').add({ hours: 9, minutes: 15 }).format('hh:mm:ss')
  }
  return moment(formState.startTime).add({ hours: 9, minutes: 15 }).format('hh:mm:ss')
})
const addWorkResultTime = computed(() => {
  if (moment(formState.startTime).get('hours') === 8 && moment(formState.startTime).get('minutes') < 30) {
    return moment('8:30:00', 'hh:mm:ss')
      .add({ hours: 9 + formState.overtimeHours, minutes: formState.overtimeHours === 0 ? 15 : 45 })
      .format('hh:mm:ss')
  }

  return moment(formState.startTime)
    .add({ hours: 9 + formState.overtimeHours, minutes: formState.overtimeHours === 0 ? 15 : 45 })
    .format('hh:mm:ss')
})

const formState: UnwrapRef<FormState> = reactive({
  startTime: moment('9:00:00', 'h:mm:ss'),
  overtimeHours: 0,
  overtimeHoursEnd: 4,
})

/* 周末 */

const addWorkResultTimeEnd = computed(() => {
  if (moment(formState.startTime).get('hours') === 8 && moment(formState.startTime).get('minutes') < 30) {
    return moment('8:30:00', 'hh:mm:ss')
      .add({ hours: formState.overtimeHoursEnd > 4 ? formState.overtimeHoursEnd + 1 : formState.overtimeHoursEnd })
      .format('hh:mm:ss')
  }

  return moment(formState.startTime)
    .add({ hours: formState.overtimeHoursEnd > 4 ? formState.overtimeHoursEnd + 1 : formState.overtimeHoursEnd })
    .format('hh:mm:ss')
})

const activeKey: Ref<string> = ref('weekdays')
</script>

<style lang="scss" scoped>
.time {
  width: 80%;
  margin: 0px auto;
  height: 100%;
}
</style>
