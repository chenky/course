// import "../component/module3";

// let colors = ["red", "green", "blue"];
// let items = [];

// items.pushAll(colors);
// console.log(items);


// 最有可能应用在polyfill上


// 浏览器模块说明符解析
// imports from https://www.example.com/modules/example1.js
import { first } from "./example1.js";

// imports from https://www.example.com/example2.js
import { second } from "../example2.js";

// imports from https://www.example.com/example3.js
import { third } from "/example3.js";

// imports from https://www2.example.com/example4.js
import { fourth } from "https://www2.example.com/example4.js";


// // 报错
// // invalid - doesn't begin with /, ./, or ../
import { first } from "example.js";

// invalid - doesn't begin with /, ./, or ../
import { second } from "example/index.js";