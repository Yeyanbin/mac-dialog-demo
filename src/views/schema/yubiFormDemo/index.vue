<template>
  <h2>this is yubiFormDemo page!</h2>
  <yubi-form 
    v-bind="{
      customComponents,
      content,
      state,
    }">
  </yubi-form>  
</template>

<script setup lang="ts">
import yubiForm from '../../../components/yubiForm/index.vue';
import test from './test.vue';

const customComponents = {
  test,
};

const content = [
  {
    component: "NInput",
    label: {
      expression: "{type}",
      // "value": "操作备注",
      type: "string"
    },
    layout: {
      span: "2 400:3 600:3 800:2",
    },
    path: "remark"
  },
  {
    component: "NSelect",
    label: "选择歌曲",
    path: "song",
    layout: {
      span: "5 400:5 600:3 800:2",
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
      span: "10 400:5 600:2 800:2",
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
    layout: {
      span: " 10 400:5 600:2 800:2",
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

</script>

<style scoped>

</style>
