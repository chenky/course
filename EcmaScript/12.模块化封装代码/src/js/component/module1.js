// javascript共享一个全局作用域，而且不像后台强类型语言有包的概念
// ES6引入了模块化管理，已应对越来越复杂的大型项目

// 1. 不会被添加到全局作用域中
// 2. 必须导出外部代码方可访问
// 3. 模块顶部的this是undefined

export let thisObj = this;

export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// export function
// export default function sum(num1, num2) {
    export function sum(num1, num2) {
    return num1 + num2;
}

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