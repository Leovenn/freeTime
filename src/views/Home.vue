<template>
  <a-layout class="home">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div class="logo" />
      <!-- <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu> -->
      <LeftNav></LeftNav>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff' }" class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> FreeSystem ©2021 Created by Leoven </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import LeftNav from '@/components/leftNav/leftNav.vue'
// import Time from '@/views/HelloWorld.vue'
// const selectedKeys: Ref<string[]> = ref(['4'])
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .content {
    height: 100%;
  }
}
</style>
