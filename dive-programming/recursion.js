/**
 *Fibonacci 数列
 */ 
// 递归
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
// 最后一步是函数，并且没有其他操作，就是调用函数
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