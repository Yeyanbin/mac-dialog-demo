
### useExpressionCompute 

- 返回toReversePolishNotation和computeReversePolishNotation两个方法
  - toReversePolishNotation 将中缀表达式转化为逆波兰表达式
  - computeReversePolishNotation 计算逆波兰表达式
```js
const { toReversePolishNotation, computeReversePolishNotation } = useExpressionCompute(state, defaultFormValue);
```

### useFormContent

- 提供对表单的配置表进行处理

### 最简单的用法


```js
const state = {};
const formValue = {};

const formContent = useFormContent(props.content, useExpressionCompute(state, formValue));
```