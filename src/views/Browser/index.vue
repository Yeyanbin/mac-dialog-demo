<script setup lang="ts">
import { ArrowBack, ArrowForward, RefreshOutline } from '@vicons/ionicons5'
import { ref, nextTick, reactive, onMounted } from 'vue'
import useDomObserver from '../../libs/@yubi/y-hooks/useDomObserver';

const browserRef = ref<HTMLDivElement>();
const inputRef = ref(null);
// const url = ref("https://www.naiveui.com/zh-CN/os-theme/components/icon");
const url = ref("https://v3.cn.vuejs.org/");


const historyIndex = ref(0);
const history = reactive([url.value]);

function onEnter() {
  const value = inputRef.value.value;
  url.value = value;
  history.push(value);
  historyIndex.value = historyIndex.value + 1;
}



function refresh() {
  const oldUrl = url.value;
  url.value = "";
  nextTick(() => {
    url.value = oldUrl;
  })
}

function changeHistory(v: number) {
  if (history.length > 0 &&
    ((v === -1 && historyIndex.value > 0)
      ||
      (v === 1 && history.length > historyIndex.value + 1))
  ) {
    historyIndex.value += v;
    console.log('vvv', historyIndex.value)
    url.value = history[historyIndex.value];
  }
}

// const { watch } = useDomObserver();

onMounted(() => {
  // watch(browserRef.value)
  console.log(browserRef);
  // browserRef.value.onload
});

const log = (...arg) => {
  console.log('log', ...arg);
  const [ev] = arg;
  ev.path.forEach(item => {
    console.dir(item);
  });
}

</script>

<template>
  <div class="com-browser">
    <div class="operation">
      <div class="op-list">
        <n-icon
          :color="history.length > 0 && historyIndex > 0 ? '' : '#d8d8d8'"
          size="24"
          @click="changeHistory(-1)"
        >
          <ArrowBack></ArrowBack>
        </n-icon>

        <n-icon
          :color="history.length > 0 && history.length > historyIndex + 1 ? '' : '#d8d8d8'"
          size="24"
          @click="changeHistory(1)"
        >
          <ArrowForward></ArrowForward>
        </n-icon>

        <n-icon size="24" @click="refresh">
          <RefreshOutline></RefreshOutline>
        </n-icon>
      </div>
      <div class="address">
        <input :value="url" ref="inputRef" @keyup.enter="onEnter" />
      </div>
    </div>
    <div class="content">
      <iframe ref="browserRef" @haschange="log" @load="log" :src="url"></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
.com-browser {
  height: 100%;
  .operation {
    background: white;
    height: 38px;

    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid #f1f1f1;

    .op-list {
      display: flex;
      width: 100px;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .address {
      box-sizing: border-box;
      background: #f1f1f1;
      width: 100%;
      box-sizing: border-box;
      padding: 2px 4px;
      border-radius: 6px;
      margin-left: 10px;

      > input {
        border: none;
        background: transparent;
        outline: none;
        width: 100%;
      }
    }
  }

  .content {
    height: calc(100% - 38px);
    > iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
