
interface IOptions {
  otherOperators?: any;
}


export default (state, formData, opt: IOptions = {}) => {
  const operaLevelMap = {
    '=': 0,
    '>': 0,
    '<': 0,
    '&': 0,
    '|': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
  };
  
  const operaCompute = {
    '=': (num1, num2) => {
      return num1 === num2? 1: 0;
    },
    '>': (num1, num2) => {
      return num1>num2? 1: 0;
    },
    '<': (num1, num2) => {
      return num1<num2? 1: 0;
    },
    '&': (num1, num2) => {
      return num1&num2? 1: 0;
    },
    '|': (num1, num2) => {
      return num1|num2? 1: 0;
    },
    '+': (num1, num2) => {
      return num1+num2;
    },
    '-': (num1, num2) => {
      return num1 - num2;
    },
    '*': (num1, num2) => {
      return num1*num2;
    },
    '/': (num1, num2) => {
      return num1/num2;
    },
    '^': (num1, num2) => {
      return Math.pow(num1, num2);
    },
    ...(opt && opt.otherOperators)
  }
  

  const handleElement = (expression, i) => {
    if (expression[i] !== '{') {
      return getNumber(expression, i);
    } else {
      return getState(expression, i);
    }
  }
  
  const handleOperaSign = (expression, i) => {
    if (expression[i] !== '$') {
      return [expression[i], i];
    }
    i += 1;
    const strArray = [];
    const start = i;
    while(!operaCompute[strArray.join('')] && expression[i] !== undefined) {
      // console.log(strArray.join(''));
      strArray.push(expression[i]);
      i += 1;
    }
    if (expression[i] === undefined) {
      throw new Error(`Can\'t found operator sign by start ${start}`);
    }
    return [strArray.join(''), i];
  }
  
  const getNumber = (expression, i) => {
    const nums = [];
    while(Number.isInteger(+expression[i]) || expression[i] === '.') {
      nums.push(expression[i]);
      ++i;
    }
    return [+nums.join(''), i-1];
  };

  const getState = (expression, i) => {
    i += 1;
    const key = [];
    while(expression[i] !== '}') {
      key.push(expression[i]);
      ++i;
    }
    let value = formData[key.join('')] !== undefined? formData[key.join('')] : state[key.join('')];
    return [value , i];
  }
  
  const handleCompute = (num2, num1, sign) => {
    // console.log(operaCompute[sign], sign, num1, num2);
    return operaCompute[sign](num1, num2)
  };
  /**
   * 中缀表达式转换逆波兰表达式
   * 
   * @param {string} 合法的中缀表达式
   * @returns {string} 逆波兰表达式
   */
  const toReversePolishNotation = (expression) => {
    const elementStack = [];
    const operationStack = [];
  
    for(let i = 0, len = expression.length ; i<len ; ++i) {
      
      // 运算符情况
      if (operaLevelMap[expression[i]] !== undefined || expression[i] === '$') {
  
        let sign = undefined;
        // 查找运算符
        [sign, i] = handleOperaSign(expression, i);

        // 如果运算符栈中已经拥有运算符
        while (operationStack.length > 0) {
          
          // 弹栈，获取栈顶元素
          const topOpera = operationStack.pop();
          if (operaLevelMap[sign] > operaLevelMap[topOpera] || topOpera === '(') {
            // 优先级高于栈顶运算符，所以栈顶运算符回到栈顶，当无事发生过，跳出循环
            operationStack.push(topOpera);
            break;
          } else {
            // 栈顶操作符不能被新运算符容纳，往元素栈里塞
            elementStack.push(topOpera);
          }
        } 
        // 新运算符进运算符栈
        operationStack.push(sign);
        
      // 处理括号
      } else if (expression[i] === '(') {
        // 是 (
        operationStack.push('(')
      } else if (expression[i] === ')') {
        // 是 )，往elementStack里塞运算符
        let opera = '';
        while((opera = operationStack.pop()) !== '(') {
          elementStack.push(opera);
        }
      // 忽略空格
      } else if (expression[i] === ' ') {
        // continue;
      } else {
        // 是 元素
        let num = 0;
        [num, i] = handleElement(expression, i); //获取元素
        elementStack.push(num);
      }
    }
  
    // 最后再把运算符栈全部弹到元素栈
    while(operationStack.length > 0) {
      elementStack.push(operationStack.pop());
    }
    return elementStack;
  }
  
  /**
   * 
   * @param {Array} reversePolishNotation 上面的elementStack
   */
  const computeReversePolishNotation = (reversePolishNotation) => {

    if(reversePolishNotation.includes(undefined)) {
      return undefined;
    }

    if (reversePolishNotation.length > 1) {
      const numberStack = [];
  
      reversePolishNotation.forEach((element) => {
        // 区分是否运算符
        if (!operaCompute[element]) {
          // 如果不是操作符则直接进number栈
          numberStack.push(element);
        } else {
          // 如果是运算符，则弹出两个number出来运算，[1, 1], +, 运算 1+1
          numberStack.push(handleCompute(numberStack.pop(), numberStack.pop(), element));
        }
      })

      return numberStack.pop();
    } else {

      return reversePolishNotation.pop();
    }
  }
  
  
  return {
    toReversePolishNotation,
    computeReversePolishNotation,
  }
};

