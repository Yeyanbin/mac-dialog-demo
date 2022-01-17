<template>
  <div class="container">
    home 
    <!-- <WindowDialog></WindowDialog>
    <WindowDialog v-if="dialogShow" :dialogProp="{ x: 50, y: 50 }" @clickDialog="clickDialog">
      <template v-slot:title>测试关闭的dialog</template>
      <div style="padding: 15px;">
        <n-form :model="model" ref="formRef" :rules="rules">
          <n-form-item path="age" label="年龄">
            <n-input v-model:value="model.age" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="model.password"
              @input="handlePasswordInput"
              type="password"
              :input-props="{
                autocomplete: 'off'
              }"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item first path="reenteredPassword" label="重复密码" ref="rPasswordFormItemRef">
            <n-input
              :disabled="!model.password"
              v-model:value="model.reenteredPassword"
              type="password"
              :input-props="{
                autocomplete: 'off'
              }"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
      </div>
    </WindowDialog>
    <WindowDialog :dialogProp="{ x: 100, y: 150, width: '700px' }">
      <template v-slot:title>test title</template>
      <template v-slot="{ dialogProp }">
        <div style="padding: 40px;">
          <template v-if="dialogProp" v-for="(value, key) in dialogProp">
            <n-statistic style="width: 100px;display: inline-block;" :label="key">{{ value }}</n-statistic>
          </template>
        </div>
      </template>
    </WindowDialog> -->
  </div>
</template>

<script setup lang="ts">
import WindowDialog from '@/components/WindowDialog/index.vue';

import { ref } from 'vue';

const dialogShow = ref(true);

const formRef = ref(null);

const model = ref({
  age: null,
  password: null,
  reenteredPassword: null
})

const clickDialog = () => {
  console.log('clickDialog outer');
  dialogShow.value = false;
};

const rPasswordFormItemRef = ref(null)

function validatePasswordStartWith(rule, value) {
  return (
    model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  )
}
function validatePasswordSame(rule, value) {
  return value === model.value.password
}

const rules = {
  age: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('需要年龄')
        } else if (!/^\d*$/.test(value)) {
          return new Error('年龄应该为整数')
        } else if (Number(value) < 18) {
          return new Error('年龄应该超过十八岁')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
};

const handlePasswordInput = () => {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  background: url(https://pic2.zhimg.com/v2-2762684d8dfc5c0e8e561f0c362eccc0_r.jpg?source=1940ef5c);
  background-size: cover;
  padding: 10px;
  display: flex;
  height: 100vh;
  width: 100vw;

  > div {
    margin: 20px;
  }
}
</style>
