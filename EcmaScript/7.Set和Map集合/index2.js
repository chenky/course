// 数组去重
// function eliminateDuplicates(items) {
//     return [...new Set(items)];
// }
// let numbers = [1, 2, 3, 3, 3, 4, 5, "5", "string"],
//     noDuplicates = eliminateDuplicates(numbers);
// console.log(noDuplicates);

// Weak Set集合        
// let set = new Set(),
//     key = {test: "test"};
// set.add(key);
// console.log(set.size); // 1
// key = null;  
// console.log(set.size, [...set][0]);

// WeakSet示例代码
// weak set只能存储对象的集合，不能存储原始值；不可迭代（即不支持for-of，forEach，size，keys，values）
// 只有add，delete，has方法
// var ws = new WeakSet();
// var value = new Array(6 * 1024 * 1024);  // 开辟一个大数组 
// ws.add(value);
// console.log(ws.has(value)); // true
// value = null; // 解除引用
// console.log(ws.has(value)); // false, 不能这么对比，因为value已经是null了

/** node --expose-gc **/ // 启动node环境 手动调用垃圾回收机制
// console.log('node --expose-gc')
global.gc(); // 首先调用一次垃圾回收
console.log(process.memoryUsage()); // 查看内存占用 heapUsed约2M
/*
 {
   rss: 20918272,
   heapTotal: 4608000,
   heapUsed: 2454576,
   external: 1384318
 }
*/
var ws = new WeakSet();
var value = new Array(6 * 1024 * 1024); // 开辟一个大数组 
ws.add(value);
console.log(ws.has(value)); // true
console.log(process.memoryUsage()); // heapUsed约53M
/*
 {
   rss: 74158080,
   heapTotal: 55259136,
   heapUsed: 53717760,
   external: 1384490
 }
*/
value = null; // 解除引用
global.gc(); // 执行垃圾回收
console.log(process.memoryUsage());  // heapUsed约2M 内存已回收
/*
 {
   rss: 23035904,
   heapTotal: 5185536,
   heapUsed: 2716856,
   external: 1384417
 }
*/
// console.log(ws.has(value)); // false