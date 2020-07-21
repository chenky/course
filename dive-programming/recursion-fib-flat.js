/**
 *Fibonacci 数列
 */ 
// 递归
/**
 * 1. 要有边界条件，防止无限递归
 * 2. 要有子问题，复杂问题分解，确定递归公司
*/
function fib(n){
  if(n<3) return 1;
  return fib(n-2) + fib(n-1);
}
console.log(fib(6))
console.log(fib(10))

// 循环
function fib2(n){
  let first=1, second = 1;
  while (n-->2) {
    [first, second] = [second, first+second]
  }
  return second;
}
console.log(fib2(6))
console.log(fib2(10))

// 尾调用优化
// 1. 最后一步是调用另一个函数, 不一定出现在函数尾部，只要是最后一步操作即可
// 2. 并且最后一步不能有其他操作，比如前面return fib(n-2) + fib(n-1);就算有其他操作
function fibTail(n, first=1, second =1){
  if(n<3) return second;
  return fibTail(n-1, second, (first+second))
}
console.log(fibTail(6))
console.log(fibTail(10))


/**
 * 展开数组
*/
// 递归
function flat(arr){
  let result = [];
  (function innerFlat(arr){
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if(Array.isArray(element)){
        innerFlat(element)
      } else {
        result.push(element)
      }      
    }    
  })(arr);
  return result;
}
console.log(flat([1,[2,3],[4,[5,6]]]))
function flat1(arr){
  let result = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if(Array.isArray(element)){
      result = result.concat(flat1(element))
    } else {
      result.push(element)
    }      
  }
  return result;
}
console.log(flat1([1,[2,3],[4,[5,6]]]))

// 循环
function flatWhile(arr){
  let result = [];
  while (arr.some(item=>Array.isArray(item))) {
    result = [].concat(...arr);
  }
  return result;
}
console.log(flat1([1,[2,3],[4,[5,6]]]))

// 尾调用优化
function flatTail(arr, result=[]){
  if(arr.length===0) return result;
  let element = arr.shift();
  if(Array.isArray(element)){
    // 展开后再插入队首
    arr.unshift(...element)
  } else {
    result.push(element)
  } 
  return flatTail(arr, result)
}
console.log(flat1([1,[2,3],[4,[5,6]]]))