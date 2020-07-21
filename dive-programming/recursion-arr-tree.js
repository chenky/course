/**
     * 数组转化成树，树转化成数组
    */
    // 一维数组
    const arr = [
      { id: 0, name: "总公司" },
      { id: 1, name: "分公司1" },
      { id: 2, name: "分公司2" },
      { id: 11, name: "分公司1-1" },
      { id: 12, name: "分公司1-2" },
      { id: 21, name: "分公司2-1" },
      { id: 111, name: "分公司1-1-1" },
      { id: 112, name: "分公司1-1-2" },
      { id: 121, name: "分公司1-2-1" },
      { id: 122, name: "分公司1-2-2" }
    ];
    console.log('original arr', arr)
    function arr2Tree(arr){
      // 拷贝参数对象，否则会更改数组项的属性，添加了parentId，children
      let copyArr = JSON.parse(JSON.stringify(arr))
      let tree = {};
      let tempObj = {};
      let len = copyArr.length;
      for (let index = 0; index < len; index++) {
        const element = copyArr[index];
        // 得到一个对象类似
        /* 
        { 
          0: {id:0, name:"", parentId:null},
          1: {id:1, name:"", parentId: 0}
        }    
        */
        const id = String(element.id);
        if(id==="0"){
          element.parentId = null;
        } else{
          // id长度为1且不为0的均为id为0的子节点
          const parentId = id.slice(0,id.length-1) || 0;
          element.parentId = parentId;
        }
        tempObj[id] = element;        
      }
      // console.log(tempObj);

      for (const [id, item] of Object.entries(tempObj)) {
        const parentId = item.parentId;
        if(parentId!==null){
          // 有父节点
          if(!tempObj[parentId].children){
            tempObj[parentId].children = [];
          }
          tempObj[parentId].children.push(item);
        } else{
          // 没有父节点，即根节点
          tree[id] = item;
        }
      }
      return tree;
    }

    // console.log( arr2Tree(arr) )


    // 树形结构转数组
    function tree2Arr(tree){
      /* 
        树形结构为
        {
          0: 
          {
            id: 0, name:"", parentId: null,
            children: [
              { 
                id: 1, name:"", parentId: 0,
                children: [

                ]
              },
              ...
            ]
          }
        }
      */

      // 根节点做特殊处理
      let root = tree["0"];
      function temp(treeObj, arr=[]){
        const { children,...rest } = treeObj;
        arr.push(rest);
        if(children && children.length>0){          
          for (const value of children) {
            temp(value, arr);
          }
        }
        return arr;
      }
      return temp(root);
    }

    let tree = arr2Tree(arr);
    console.log(tree)
    console.log( tree2Arr(tree) );