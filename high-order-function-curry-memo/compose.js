// compose函数
// function compose(...fns){  
//   return function(...args){ 
//     let ret = args   
//     fns.forEach((fn)=>{
//       ret = fn.apply(this, Array.isArray(ret) ? ret : [ret])
//     })
//     return ret;
//   }
// }
// function compose(...fns){  
//   return (...args) => {
//     return fns.reduce((arg,currentFn)=>{
//       return currentFn.apply(this, Array.isArray(arg) ? arg : [arg])
//     }, args)    
//   }
// }
// function fn1(...args){
//   return args.reduce((total, val)=>{
//     total += val;
//     return total;
//   }, 0)
// }
// function fn2(arg){
//   return 2*arg;
// }
// function fn3(arg){
//   return arg+"aaa";
// }

// const res = compose(fn1,fn2,fn3)(1,2,3)
// console.log(res)

// 异步compose函数
function createAsyncFn(delay){
  return function(...lastResult){
    return new Promise(function(resolve, reject){
      setTimeout(function(){        
        const res = lastResult.reduce((total, val)=>{
          total += val;
          return total;
        }, 0)
        resolve(res)
      }, delay)
    })    
  }
}
const asyncFn1 = createAsyncFn(1000)
const asyncFn2 = createAsyncFn(1000)
const asyncFn3 = createAsyncFn(1000)
const asyncFn4 = function(...lastResult){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      const res = lastResult.join("") + "_asyncFn4";
      resolve(res)
    },1000)
  })
}
const asyncFn5 = function(...lastResult){
  return new Promise(function(resolve, reject){
    // reject('asyncFn5 error')
    resolve(lastResult.join("") + "_asyncFn5")
  })
}

function asyncCompose(...asyncFns){
  return function(...args){
    return asyncFns.reduce((prev, next)=>{
      // 串行执行promise
      // return prev.then(next)
      return prev.then(function(lastResult){
        // lastResult: 初始化接受的可能是一个数组参数 [] || arg
        return next.apply(null, Array.isArray(lastResult) ? lastResult : [lastResult])
      })
    }, Promise.resolve(args))
  }
}

const asyncRes = asyncCompose(asyncFn1,asyncFn2,asyncFn3,asyncFn4,asyncFn5)(1,2,3)
asyncRes.then(function(res){ console.log('final result', res) }).catch(function(err){
  console.log(err)
})