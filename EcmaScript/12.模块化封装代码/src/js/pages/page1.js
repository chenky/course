

        // 导入单个模块
        import { color } from "../component/module1";
        console.log(color);

        // 导入多个模块
        import {thisObj, color,name,magicNumber,sum,Rectangle,multiply} from "../component/module1";
        console.log(color);
        console.log(name);
        console.log(magicNumber);
        console.log(sum(1,2));
        console.log(Rectangle);
        console.log(multiply(2,2));
        console.log("this is page1");        
        console.log(thisObj);

        // 导入所有模块
        import * as test from "../component/module1";
        console.log(test.color);
        console.log(test.name);

        // 导入默认值
        import sum from "../component/module2";
        console.log(sum(1,3));
        import add from "../component/module2";
        console.log(add(1,3));


        // 不需要大括号，默认放在非默认之前
        import sum,{color} from "../component/module2";
        console.log(sum(1,2));
        console.log(color);

        // 不能动态的导入导出绑定，便于编辑器或工具分析
        if(flag){
                export flag;
        }
        function tryImport(){
                import flag from "";
        }
        
        

        
        
        
        
        