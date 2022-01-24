
const element: HTMLElement[] = [];

const callback: MutationCallback = (mutationList, observer) => {
  mutationList.forEach((mutation) => {
    console.log('callback', mutation, observer);
    switch(mutation.type) {
      case 'childList':
        /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
           mutation.removedNodes */
        break;
      case 'attributes':
        /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
           该属性之前的值为 mutation.oldValue */
        console.log(mutation);
        break;
    }
  });
};

const observer = new MutationObserver(callback);


const defaultOptions = {
  childList: true,  // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true,     // 观察后代节点，默认为 false
  attributeOldValue: true
}

const useDomObserver = () => {
  
  const watch = (target: HTMLElement) => {
    observer.observe(target, defaultOptions);
  }

  // const disconnect
  
  return {
    watch,
  }
}

export default useDomObserver;
