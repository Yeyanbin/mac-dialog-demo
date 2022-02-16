<template>
  <n-form
    v-bind="formConfig"
    :model="formValue"
    :rules="props.rules"
    ref="formRef"
    inline>
    <n-grid :cols="10">
      <n-grid-item span="2" v-bind="item.layout" v-for="item of formContent" style="padding: 5px 10px;">
        <n-form-item v-bind="item">
          <component v-bind="item" :is="item.component" v-model:value="formValue[item.path]">
            {{ item.inner }}
          </component>
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">

import { computed, DebuggerEvent, onMounted, ref, watch } from 'vue';
import { getDefaultFormValue } from '../../libs/schemaHooks/utils';

import { formConfig } from './config';
import useFormContent from '../../libs/schemaHooks/useFormContent';
import useExpressionCompute from '../../libs/schemaHooks/useExpressionCompute';

const props = defineProps({
  rules: Object,
  content: Array,
  state: Object,
  customComponents: Object,
})

const emit = defineEmits(['change', 'update'])
const formValue = ref(getDefaultFormValue(props.content, props.state));

const formContent = computed(() => {
  console.log('handleContent, changeFormItemList')
  // const _formValue = formValue;
  const newExpressComputeValue = useExpressionCompute(props.state, formValue.value)
  return useFormContent(props.content, newExpressComputeValue);
}, {
  onTrack: (event: DebuggerEvent) => {
    // console.log('track', event);
  },
  onTrigger: (event: DebuggerEvent) => {
    // console.log('trigger', event);
  }
});

// const formItemList = ref(handleContent(props.content, useExpressionCompute(props.state, formValue.value)));

/**
 * formContent更新，给外部组件提供change钩子
 */
watch(formContent, (value) => {
  console.log('formContentUpdate', value);
  // formValue.value = 
  emit('change', {
    formValue: formValue.value,
    formContent: value,
  });
});

/**
 * 表单值更新，提供update钩子
 */
watch(formValue.value, (value) => {
  console.log('formValueUpdate', value);

  const newFormContentValue = useFormContent(props.content, useExpressionCompute(props.state, value));
  console.log('form content', newFormContentValue);
  // formContent.value = handleContent(props.content, useExpressionCompute(props.state, value));
  emit('update', {
    formValue: value,
    formContent: formContent.value,
  })
})


onMounted(() => {
  console.log('formContent', formContent.value);
});

</script>

<style scoped>

</style>
