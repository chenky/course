/** node --expose-gc **/ // 启动node环境 手动调用垃圾回收机制
// console.log('node --expose-gc')
function test(){
  global.gc(); // 首先调用一次垃圾回收
  console.log(process.memoryUsage()); 

  let ws = new WeakMap();
  let key = {};
  let value = new Array(6 * 1024 * 1024); // 开辟一个大数组 
  ws.set(key,value);
  console.log(ws.has(key)); // true
  console.log(process.memoryUsage()); 
  key = null; // 解除引用
}
test();
global.gc(); // 执行垃圾回收
console.log(process.memoryUsage());  

