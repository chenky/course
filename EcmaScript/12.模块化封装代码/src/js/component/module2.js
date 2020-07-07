// 怪异之处，不要这么用，使用set，get，变量不导出
// export let name = "cql";
// export function setName(newName){
//     name = newName;
// }

// 导入导出重命名
// function sum(num1, num2) {
//     return num1 + num2;
// }
// export { sum as add };

// 导出默认值
// 每个模块只能有一个默认导出值
// 1.
// export default function(num1, num2) {
//     return num1 + num2;
// }
// // // 2.
// function sum(num1, num2) {
//     return num1 + num2;
// }
// export default sum;
// // // 3.
// function sum(num1, num2) {
//     return num1 + num2;
// }
// export { sum as default };

// 导出默认和非默认模块
// export let color = "red";

// export default function(num1, num2) {
//     return num1 + num2;
// }


// 重新导出绑定
// import { sum } from "./example.js";
// export { sum }
// // // 或者
// export { sum } from "./example.js";

// export { sum as add } from "./example.js";

// // // example如果有默认导出，无法定义一个新的默认导出
// export * from "./example.js";