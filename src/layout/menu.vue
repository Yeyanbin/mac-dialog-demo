<template>
  <n-space vertical size="large">
    <n-layout has-sider :style="{ height: `calc(${props.dialogProp.height} - 36px)` }">
      <n-layout-content style="overflow: hidden">
        <template v-if="nowComponent">
          <nowComponent v-bind="props"></nowComponent>
        </template>
      </n-layout-content>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed="collapsed"
        :collapsed-width="64"
        :width="180"
        :native-scrollbar="false"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menu"
          :on-update:value="handleUpdateValue"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { LogInOutline, HomeOutline, FolderOutline, LogoChrome } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { Component, h, ref, markRaw, computed } from 'vue';
import Home from "@/views/home/index.vue";
import Login from "@/views/login/index.vue";
import demo from "@/views/demo/index.vue";
import Browser from "@/views/Browser/index.vue";

const props = defineProps({
  dialogProp: {
    type: Object,
  },
  context: {
    type: Object,
  },
  dialogItem: Object,
  containerProp: Object,
});

const collapsed = ref(true);



function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menu = [
  {
    label: "主页",
    key: "home",
    icon: renderIcon(HomeOutline),
    component: Home,
  },
  {
    label: "Login",
    key: "login",
    icon: renderIcon(LogInOutline),
    component: markRaw(Login),
  },
  {
    label: "demo",
    key: "demo",
    icon: renderIcon(FolderOutline),
    component: demo,
  },
  {
    label: "browser",
    key: "browser",
    icon: renderIcon(LogoChrome),
    component: Browser,
  },
];
const getDefaultComponent = () => {
  const key = props.dialogItem?.appName;
  if (!key) return undefined;

  for (const item of menu) {
    if (item.key === key) {
      return item.component;
    }
  }

  return undefined;
};

const nowComponent = ref<Component>(getDefaultComponent());

const handleUpdateValue = (key, menuOption) => {
  console.log(key, menuOption);
  nowComponent.value = menuOption.component;
  console.log("update", nowComponent.value);
  // router.push(key);
};
</script>

<style lang="scss" scoped>
.container {
  // background-color: #000;
  // background: url(https://pic2.zhimg.com/v2-2762684d8dfc5c0e8e561f0c362eccc0_r.jpg?source=1940ef5c);
  // background-size: cover;
  // padding: 10px;
  display: flex;
  height: 100%;
  width: 100%;

  > div {
    margin: 20px;
  }
}
</style>
