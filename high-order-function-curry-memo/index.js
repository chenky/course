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

// 函数memorization
// function memo(fn){
//   if(typeof fn !== 'function'){
//     console.error('argument of fn must be a function')
//     return
//   }
//   const cache = {};
//   return function(...args){
//     const argsStr = args.join("").toString()
//     if(cache[argsStr]){
//       console.log('get result from cache')
//       return cache[argsStr]
//     } else {
//       console.log('get result from fn')
//       return cache[argsStr] = fn.apply(this, args)
//     }
//   }
// }
// function add(a,b,c){
//   return a+b+c;
// }
// const memoAdd = memo(add)
// console.log(memoAdd(1,2,3))
// console.log(memoAdd(1,2,3))

// Function.prototype.memo = function(){
//   const cache = {};
//   const self = this
//   return function(...args){
//     const argsStr = args.join("").toString()
//     if(cache[argsStr]){
//       console.log('get result from cache')
//       return cache[argsStr]
//     } else {
//       console.log('get result from fn')
//       return cache[argsStr] = self.apply(this, args)
//     }
//   }
// }

// function substruction(a,b){
//   return a-b;
// }
// const memoSub = substruction.memo()
// console.log(memoSub(3,1))
// console.log(memoSub(3,1))

function defaultEquality(a,b){
  if(!Array.isArray(a)||!Array.isArray(b)){
    // 必须都是array数组
    return false
  }
  if(a.length!==b.length){
    // 长度必须相等
    return false
  }
  for (let index = 0; index < a.length; index++) {
    if(a[index] !== b[index]){
      return false
    }    
  }
  return true
}
// 上面容易造成内存泄露，所以reselector或者react.memo都是只保存最近的一次缓存
function cacheLastMemo(fn, equalityCheck=defaultEquality){
  let lastArgs = null;
  let lastResult = null;
  return function(...args){
    if(!equalityCheck(lastArgs, args)){
      console.log('get result from fn')
      lastResult = fn.apply(this, args);
    } else{
      console.log('get result from lastResult')
    }   
    lastArgs = args 
    return lastResult;
  }
}

function division(a,b){
  return a/b;
}
const divisionMemo = cacheLastMemo(division)
console.log(divisionMemo(10,2))
console.log(divisionMemo(10,2))
console.log(divisionMemo(8,2))
console.log(divisionMemo(10,2))
console.log(divisionMemo(10,2))