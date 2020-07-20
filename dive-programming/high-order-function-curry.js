/**
 * javascript中，函数可以作为参数输入，也可作为返回输出，比如map，reduce等等都是高阶函数
*/

// 作为参数，常用的是callback
// function add(a,b, callback){
//   const res = a + b;
//   typeof callback === 'function' ? callback(res) : "";
// }
// add(1,2, function(val){
//   console.log('get the result:', val)
// })

// 作为返回， 比如curry化
// function multiplyBy(num1) {
//   return function(num2) {
//     return num1 * num2;
//   };
// }

// const multiplyByThree = multiplyBy(3)
// const multiplyByFive = multiplyBy(5)
// console.log(multiplyByThree(4))
// console.log(multiplyByFive(6))

// 参数curry化
function add2(...args){
  return args.reduce((total,currentVal)=>{
    total+=currentVal;
    return total
  },0)
}
function curry(fn){
  let allArgs=[]
  return function reFn(...args){
    if(args.length===0){
      return fn.apply(this, allArgs)
    } else {
      allArgs = allArgs.concat(args)
      return reFn
    }
  }
}
const curryAdd2 = curry(add2)
console.log(curryAdd2(1)(2)(3)(4,5)())


