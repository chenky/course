/**
 * 快速排序
 * 1. 找到一个基点，比基点小的在左边，否则在右边
 * 2. 递归调用直到全部有序
*/
const quickSort = (arr) => {
  // 边界条件
  if(arr.length===0){
    return []
  }
  let [pivot, ...rest] = arr
  return [
    ...quickSort(rest.filter(item => {
      return item < pivot
    })),
    pivot,
    ...quickSort(rest.filter(item => {
      return item >= pivot
    }))
  ];
}
// console.log(quickSort([20, 1, 6, 2, 9, 3, 7, 8, 90, 4, 6]));

/**
 * 有些公司笔试题会考用递归的方式求和
*/
// 普通循环的方式
function sum(arr=[]){
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  return arr.reduce((total, value)=>{
    return total + value;
  }, 0)
}
console.log(sum([1,4,2,8]));

// 递归方式
function sumRecursion(arr=[], total=0){
  // 边界条件
  if(arr.length===0) return total;
  let [first, ...rest] = arr;
  // 子问题
  return sumRecursion(rest, total+first)
}
console.log(sumRecursion([1,4,2,8]));


