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
//   return function(...args){ 
//     let ret = args   
//     fns.forEach((fn)=>{
//       ret = fn.apply(this, Array.isArray(ret) ? ret : [ret])
//     })
//     return ret;
//   }
//   fns.reduce((prev,currentval))
// }
function fn1(...args){
  return args.reduce((total, val)=>{
    total += val;
    return total;
  }, 0)
}
function fn2(arg){
  return 2*arg;
}
function fn3(arg){
  return arg+"aaa";
}

const testCp = compose(fn1,fn2,fn3)(1,2,3,3)
console.log(testCp)