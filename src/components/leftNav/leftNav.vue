<template>
  <div>
    <a-menu mode="inline" theme="dark" @click="data.clickMenu">
      <a-sub-menu key="/home">
        <template #icon>
          <FreeIcon type="free-gongju1"></FreeIcon>
        </template>
        <template #title>小工具合集</template>
        <a-menu-item key="/workTime">计算工作时间</a-menu-item>
        <a-menu-item key="/hours">每月工时</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, VNodeChild } from 'vue'
import { FreeIcon } from '@/uitils/icons'
import { useRouter } from 'vue-router'
interface dataTyps {
  clickMenu: Function
}
interface MenuInfo {
  key: string
  keyPath: string[]
  item: VNodeChild
  domEvent: MouseEvent
}
const router = useRouter()
const data = reactive({
  clickMenu(e: MenuInfo) {
    console.log(e)
    router.push({
      path: e.keyPath.join(''),
    })
  },
})
</script>

<style lang="scss" scoped></style>
