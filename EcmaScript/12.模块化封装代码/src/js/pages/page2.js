
// import {name, setName} from "../component/module2";

// console.log(name);
// setName("change cql");
// console.log(name);
        
// import {add} from "../component/module2";
// console.log(add(1,2));

// import {add as sum} from "../component/module2";
// console.log(typeof add);
// console.log(typeof sum);   
// console.log(sum(1,2));
        
        
        
// 导入默认值
// import sum from "../component/module2";
// console.log(sum(1,3));
// import add from "../component/module2";
// console.log(add(1,3));


// 不需要大括号，默认放在非默认之前
import sum,{color} from "../component/module2";
console.log(sum(1,2));
console.log(color);

