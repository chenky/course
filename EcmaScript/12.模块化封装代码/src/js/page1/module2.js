        // javascript共享一个全局作用域，而且不像后台强类型语言有包的概念
        // ES6引入了模块化管理，已应对越来越复杂的大型项目

import {color,name,magicNumber,sum,Rectangle,multiply} from "./module1.js";

console.log(color);
console.log(name);
console.log(magicNumber);
console.log(sum(1,2));
console.log(Rectangle);
console.log(multiply(2,2));


// console.log(1);




