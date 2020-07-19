// javascript共享一个全局作用域，而且不像后台强类型语言有包的概念
// ES6引入了模块化管理，已应对越来越复杂的大型项目

// 1. 不会被添加到全局作用域中
// 2. 必须导出外部代码方可访问
// 3. 模块顶部的this是undefined

export let thisObj = this;

export var color = "red";
export let name = "cql";
export const magicNumber = 7;

// export function, 如果是默认模块，导入的时候不用{}
// export default function sum(num1, num2) {
export function sum(num1, num2) {
    return num1 + num2;
}

// 导出默认值
// 每个模块只能有一个默认导出值
// 1.
export default function(num1, num2) {
    return num1 + num2;
}
// // 2.
function sum(num1, num2) {
    return num1 + num2;
}
export default sum;
// // 3.
function sum(num1, num2) {
    return num1 + num2;
}
export { sum as default };

// export class
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// this function is private to the module
function subtract(num1, num2) {
    return num1 - num2;
}

// define a function...
function multiply(num1, num2) {
    return num1 * num2;
}
// ...and then export it later
export { multiply };
// 导入导出重命名
function sum(num1, num2) {
    return num1 + num2;
}
export { sum as add };




// 重新导出绑定
import { sum } from "./example.js";
export { sum }
// // 或者
export { sum } from "./example.js";

export { sum as add } from "./example.js";

// // example如果有默认导出，无法定义一个新的默认导出
export * from "./example.js";

// module code without exports or imports
Array.prototype.pushAll = function(items) {

  // items must be an array
  if (!Array.isArray(items)) {
      throw new TypeError("Argument must be an array.");
  }

  // use built-in push() and spread operator
  return this.push(...items);
};