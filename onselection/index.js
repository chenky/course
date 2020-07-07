(function(){

  /*
      reference:
      https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
      https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
      https://developer.mozilla.org/zh-CN/docs/Web/API/Range
      https://developer.mozilla.org/zh-CN/docs/Web/API/Range/commonAncestorContainer
      https://developer.mozilla.org/zh-CN/docs/Web/API/Range/surroundContents
      https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset
      https://developer.mozilla.org/zh-CN/docs/Web/API/Node/normalize
    */

   let elem = document.getElementById('test_select');
   let txt = document.getElementById('txt');
   let buttonPanel = document.getElementById("button-panel");

  // 初始化生成所有模块数据
  // arr: [{start:3, end: 5}, {start: 7, end: 10},...]
  function init(arr,  selectionArea){
    const elemTxt = selectionArea.innerText
    let html='';
    // 上一个截取字符串的结束位置
    let lastEnd = 0;
    arr.forEach(element => {
      const { start, end, bgColor } = element
      const tagTxt = elemTxt.slice(start, end)
      // 截取标注前的字符串
      let prevTxt = '';
      if(lastEnd === 0){
        prevTxt = elemTxt.slice(0, start)
      } else {
        prevTxt = elemTxt.slice(lastEnd, start)
      }
      lastEnd = end
      html+= prevTxt + `<span class="selection_tag" data-offset-start="${start}" style="background-color: ${bgColor}" data-offset-end="${end}">${tagTxt}<i>X</i></span>`
    });
    // 截取结尾的字符串
    const endTxt = elemTxt.slice(lastEnd);
    html += endTxt
    selectionArea.innerHTML = html
  }

  init([{start:3, end: 5, bgColor: '#a1cdf9'}, {start: 15, end: 20, bgColor: '#dab1da'}], elem)

   // 删除已经标注的内容
   elem.onclick = function(event){      
     let { target } = event;      
     if(target && target.nodeName.toLowerCase() === 'i'){
       // 获取到selection_tag
       let selectionTag = target.parentNode;
       let selectionArea = selectionTag.parentNode;
       // let { previousSibling, nextSibling } = selectionTag;
       // 获取高亮的文本
       let selectionText = target.previousSibling;     
       // 替换掉selection_tag
       // elem.replaceChild(selectionText, selectionTag);
       selectionTag.replaceWith(selectionText);
       // 相邻的文本节点会标准化，自动合并
       selectionArea.normalize();
       // $(selectionTag).replaceWith(selectionText);
       // $(selectionText).unwrap();
     }
   }

   // 标注内容
   buttonPanel.onclick = function(e){
    const { target } = e
    const {className} = target
    if (!(className && className.split(' ').indexOf('button_el') !== -1)) {
      return
    }
     let selection = window.getSelection() || document.getSelection();
     // 如果没有选择任何内容则直接返回
     if(selection.rangeCount<1){
       return
     }
     let range = selection.getRangeAt(0);
     let { rangeCount,isCollapsed } = selection;
     let { commonAncestorContainer } = range;
     let commonAncestorContainerParentElement = commonAncestorContainer.parentElement;
     // 有选择的区域，并且起始点和终点不在同一个位置
     if(rangeCount>0 && !isCollapsed){        
       // 父节点必须是可选区域，确保已经标记的tag不能再标记
       if(commonAncestorContainer.nodeType === 3 && commonAncestorContainerParentElement 
       && commonAncestorContainerParentElement.className==='selection_area'){
         // console.log(document.getSelection())
         let { startOffset, endOffset, startContainer } = range;
         let rangeTxt = range.toString();

         // 第一种计算方式
         // const preSelectionRange = range.cloneRange()
         // preSelectionRange.selectNodeContents(this.$el)
         // preSelectionRange.setEnd(range.startContainer, range.startOffset)
         // this.start = [...preSelectionRange.toString()].length
         // this.end = this.start + [...range.toString()].length

         // 第二种计算方式
         let prev = startContainer.previousElementSibling;
         let start, end;
         if(prev && prev.className === 'selection_tag'){
           // 前面有已经标记过的标签
           let { offsetEnd } = prev.dataset;
           offsetEnd = parseInt(offsetEnd, 10);
           start = startOffset + offsetEnd;
           end = endOffset + offsetEnd;
         } else {
           start = startOffset;
           end = endOffset;
         }

         console.log(start, end);          

         const bgColor = target.dataset.bgColor
         let newElem = document.createElement('span');
         newElem.className = 'selection_tag';    
         newElem.dataset.offsetStart = start;
         newElem.dataset.offsetEnd = end;
         newElem.dataset.bgColor = bgColor
         newElem.style.backgroundColor =  bgColor
         range.surroundContents(newElem)
         let closeElem = document.createElement('i');  
         closeElem.innerText = 'X'        
         newElem.appendChild(closeElem);    
         
         // 清楚选择区域的背景色
         selection.removeAllRanges()
       }
     }
   }

})()