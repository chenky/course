/**
 * 二叉树深度遍历
*/
const tree = {
  value: "-",
  left: {
      value: '+',
      left: {
          value: 'a',
      },
      right: {
          value: '*',
          left: {
              value: 'b',
          },
          right: {
              value: 'c',
          }
      }
  },
  right: {
      value: '/',
      left: {
          value: 'd',
      },
      right: {
          value: 'e',
      }
  }
}
// 递归方式
function dfsRecursion(node){
  let result = [];
  if(node){
    result.push(node.value)
    result = result.concat(dfsRecursion(node.left))
    result = result.concat(dfsRecursion(node.right))
  }
  return result;
}
// console.log(dfsRecursion(tree)); 

// 展开成循环,使用栈
function dfsLoop(node){
  let stack = [];
  let result = [];
  stack.push(node)
  while (stack.length) {
    let current = stack.pop();
    result.push(current.value);
    // 不为空则压入栈中
    if(current.right) stack.push(current.right);
    if(current.left) stack.push(current.left);
  }
  return result;
}
// console.log(dfsLoop(tree));

/**
 * 广度优先遍历二叉树(层序遍历)是用队列来实现的，广度遍历是从二叉树的根结点开始，自上而下逐层遍历；
 * 在同一层中，按照从左到右的顺序对结点逐一访问。
*/
// 递归广度遍历
function levelTravel(node){

  function temp(queue=[], result=[]){
    // 只有第一次的时候才需要添加根节点
    if(!result.length) queue.push(node)
    if(queue.length){
      // 取出队列首个元素
      const current = queue.shift();
      result.push(current.value);
      if(current.left) queue.push(current.left);
      if(current.right) queue.push(current.right);
      temp(queue, result);
    }
    return result;
  }

  return temp();
}
console.log( levelTravel(tree) );
// 循环广度遍历, 通过队列存储节点，存储的方式是按层级先左后右存储的
function levelTravelLoop(node, queue=[], result=[]){
  queue.push(node)
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    result.push(current.value)
    if(current.left) queue.push(current.left);
    if(current.right) queue.push(current.right);
    // if(current.left) queue.push(current.left);
  }
  return result;
}
console.log( levelTravelLoop(tree) );