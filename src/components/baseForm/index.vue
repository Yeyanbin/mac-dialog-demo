<template>
  <div>
    <n-form :model="formValue"     ref="formRef" inline>
      <n-form-item v-for="item of formContent" v-bind="item">
        <component :is="item.component" v-bind="item"></component>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import useExpressionCompute from '../../libs/schemaHooks/useExpressionCompute';
import useFormContent from '../../libs/schemaHooks/useFormContent';


const content = [
  {
    component: "NInput",
    label: {
      expression: "{type}",
      // "value": "操作备注",
      type: "string"
    },
    layout: {
      span: {
        value: "3",
        type: "number",
      }
    },
    path: "remark"
  },
  {
    component: "NSelect",
    label: "选择歌曲",
    path: "song",
    layout: {
      span: {
        value: "3",
        type: "number",
      }
    },
    options: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      },
      {
        label: "You Won't See",
        value: 'song3',
        disabled: true
      },
      {
        label: 'Nowhere Man',
        value: 'song4'
      },
      {
        label: 'Think For Yourself',
        value: 'song5'
      },
      {
        label: 'The Word',
        value: 'song6'
      },
    ]
  },
  {
    component: "NSelect",
    label: "性别",
    path: "gender",
    layout: {
      span: {
        value: "1",
        type: "number",
      }
    },
    options: [
      {
        label: "女",
        value: 0,
      },
      {
        label: '男',
        value: 1,
      },
    ]
  },
  {
    show: {
      type: 'boolean',
      expression: '{gender} = 1'
    },
    component: "NInput",
    label: "薪资多少",
    path: "income",
  }
];

const state = {
  "type": "操作备注",
  "remark": "备注test",
  "song": "song1",
  "gender": 1
}


const defaultForm = {};

const formContent = computed(() => {
  console.log()
  return useFormContent(content, useExpressionCompute(state, defaultForm))
})

const formValue = ref(defaultForm);
</script>
