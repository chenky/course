/**
 * matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器, 获取到更完整的信息
 * 如果没有 /g 标志，matchAll 会抛出异常
*/
var regexp = /t(e)(st(\d?))/g;
var str = 'test1test2';
console.log(str.match(regexp)); 
// Array ['test1', 'test2']
// 使用 matchAll 会得到一个迭代器的返回值，配合 for...of, array spread, 或者 Array.from() 可以更方便实现功能
console.log(...str.matchAll(regexp))

/**
 * 动态导入import，可以实现按需加载。返回一个很强大的promise
*/
// (function(){

//   // 可以实现动态导入模块，并使用模块中的方法
//   (async () => {
//     const helpersModule = 'helpers.js';
//     const module = await import(helpersModule)
//     const total = module.sum(2, 2);
//   })();

// }())


/**
 * Promise.allSettled,该Promise.allSettled()方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。
 * Promise.all 一旦有一个失败就会有异常, 现实中很多场景即使异常依然需要继续执行，而不是抛异常停止
*/
// const promise1 = Promise.resolve(1);
// const promise2 = Promise.resolve(2);
// const promise3 = Promise.resolve(3);
// const promise4 = new Promise((resolve, reject) => {
//   // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout
//   // 第三个参数将传递给reject
//   setTimeout(reject, 100, 'reject promise4')
// });
// const promise5 = new Promise((resolve, reject) => {
//   setTimeout(reject, 100, 'reject promise5')
// });
// const promises = [promise1,promise2, promise3, promise4, promise5];

// Promise.all(promises).then(results=>{
//   console.log(results)
// }).catch(reason=>{
//   console.log("error occured", reason)
// });
// Promise.allSettled(promises).then((results) =>{
//   results.forEach((result) =>{
//     console.log(result)
//   })
// });


/**
 * 在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 window、self 或者 frames 取到全局对象，
 * 但是在 Web Workers 中，只有 self 可以。在 Node.js 中，它们都无法获取，必须使用 global
 * 在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined。
 * globalThis 提供了一个标准的方式来获取不同环境下的全局 this  对象（也就是全局对象自身）。你可以安心的使用 globalThis，不必担心它的运行环境
 * 
*/


/**
 * optional chaining可选链, 判断标准是nullish (null 或者 undefined)
 * . 操作符会抛出一个错误，而 ?. 操作符则会按照短路计算的方式进行处理，返回 undefined
 * 当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。
 * 
 *  obj?.prop
    obj?.[expr]
    arr?.[index]
    func?.(args)
*/
// // 之前
// const title = data && data.article && data.article.title
// // 现在
// const title = data?.article?.title

// // before
// if (element.prepend) element.prepend(otherElement);
// // after
// element.prepend?.(otherElement);

// // before
// if (foo) {
// 	something(foo.bar);
// 	somethingElse(foo.baz);
// 	andOneLastThing(foo.yolo);
// }
// // after
// something(foo?.bar);
// somethingElse(foo?.baz);
// andOneLastThing(foo?.yolo);

// // before
// if(arr.length>3){
//   arr[2]
// }
// // after
// arr?.[2];

// // 当在表达式中使用可选链时，如果左操作数是 null 或 undefined，表达式将不会被计算
// let potentiallyNullObj = null;
// let x = 0;
// let prop = potentiallyNullObj?.[x++];
// console.log(x); // x 将不会被递增，依旧输出 0

// /**
//  * 空值合并操作符（??）是一个逻辑操作符，当左侧的表达式结果为 null 或者 undefined 时，其返回右侧表达式的结果，否则返回左侧表达式的结果。
//  * 与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。
//  * 不能与 AND 或 OR 操作符共用
// */
// const foo = null ?? 'default string';
// console.log(foo);
// // expected output: "default string"

// const baz = 0 ?? 42;
// console.log(baz);
// // expected output: 0

// // 当左表达式不为 null 或 undefined 时，不会对右表达式进
// function A() { console.log('函数 A 被调用了'); return undefined; }
// function B() { console.log('函数 B 被调用了'); return false; }
// function C() { console.log('函数 C 被调用了'); return "foo"; }
// console.log( A() ?? C() );
// // 依次打印 "函数 A 被调用了"、"函数 C 被调用了"、"foo"
// // A() 返回了 undefined，所以操作符两边的表达式都被执行了
// console.log( B() ?? C() );
// // 依次打印 "函数 B 被调用了"、"false"
// // B() 返回了 false（既不是 null 也不是 undefined）
// // 所以右侧表达式没有被执行


// // 与可选链公用
// let customer = {
//   name: "Carl",
//   details: { age: 82 }
// };
// let customerCity = customer?.city ?? "暗之城";
// console.log(customerCity); // “暗之城”