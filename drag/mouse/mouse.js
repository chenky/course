/**
 * 功能：1. 拖动， 2. 限定范围， 3. 吸附效果 4. 拖动进入目标元素变色
 * 备注：目前没有做兼容处理，可能存在兼容性问题
 * 演示：先演示，再画图，再讲代码
*/
(function () {
  const dragableBox = document.getElementById("dragable-box");
  const content = document.getElementById("content");
  const pageContent = document.getElementById('page-content')
  const pageHeight = 300
  const pageGap = 20 
  const dragableBoxHeight = dragableBox.offsetHeight
  let lastTop = 0

  function getLegalityPos(top, pageHeight, dragableBoxHeight, pageGap) {
    // 每页的高度加上页与页之间的间隙
    const pageOutHeight = pageHeight + pageGap
    // 相对当前页的top坐标
    const remainder = top % pageOutHeight
    // 拖动到第几页了, 如果算出来是0，则需要改成第一页
    const currentPage = Math.ceil(top / pageOutHeight) || 1
    const resPos = {}
    if (remainder >= 0 && remainder <= pageHeight - dragableBoxHeight) {
      // 说明没有跨页，就在第一页
      resPos.page = currentPage
      resPos.top = top
      // 相对当前页的定位
      resPos.currentPageTop = remainder
    } else {
      // 跨页了，需要根据签章的大于一半的部分在哪一页，然后移动到哪一页
      // 如果remainder<=每页高度-(签章高度-间距)/2, 说明要移动到前面一页，否则就是后面一页
      if (remainder <= pageHeight - (dragableBoxHeight - pageGap) / 2) {
        // 移动到前一页
        resPos.page = currentPage
        resPos.top = currentPage * (pageHeight + pageGap) - pageGap - dragableBoxHeight
        // 相对当前页的定位
        resPos.currentPageTop = pageHeight - dragableBoxHeight
      } else {
        // 移动到下一页
        resPos.page = currentPage + 1
        resPos.top = currentPage * (pageHeight + pageGap)
        // 相对当前页的定位
        resPos.currentPageTop = 0
      }
    }
    return resPos
  }

  // 处理背景色，并且返回当前被覆盖的元素
  function proccessBg(currentPage, pageContent){
    const targetElement = pageContent.children[currentPage-1]
    const targetPrevElement = targetElement.previousElementSibling
    const targetNextElement = targetElement.nextElementSibling
    // 清空之前的背景色, 只有可能是相邻两个元素
    targetPrevElement && (targetPrevElement.style.backgroundColor = "")
    targetNextElement && (targetNextElement.style.backgroundColor = "")
    return targetElement
  }

  // 因为已经在限定区域，所以只需要判断上下，不需要判断左右
  function proccessIntersect(top, pageHeight, pageGap, dragableBox, pageContent){
    // 没有上下移动则什么都不做
    if(lastTop === top) return
    const dragableBoxTop = top;
    const dragableBoxBottom = top + dragableBox.offsetHeight;
    // 每页的高度加上页与页之间的间隙
    const pageOutHeight = pageHeight + pageGap
    // 拖动到第几页了, 如果算出来是0，则需要改成第一页
    // 如果lastTop>top 表示上一次的top比当前的大，则用户向上移动
    const currentPage = Math.ceil( (lastTop>top ? top : dragableBoxBottom) / pageOutHeight) || 1
    
    // console.log(currentPage,'current page')

    const targetElement = proccessBg(currentPage, pageContent)

    const targetElementTop = targetElement.offsetTop;
    const targetElementBottom = targetElementTop + targetElement.offsetHeight; 

    // 只有上下相交判断，左右相交同理，很多面试题会考到
    if(dragableBoxBottom < targetElementTop ||
      dragableBoxTop > targetElementBottom){
      // 离开目标元素
      // console.log('out')
    } else {
      // 进入目标元素
      targetElement.style.backgroundColor = "#b6e0c5";
      // console.log('in')
    }
  }

  dragableBox.onmousedown = function (e) {
    e.stopPropagation();
    const distanceX = e.clientX - this.offsetLeft;
    const distanceY = e.clientY - this.offsetTop;
    document.onmousemove = function (e) {
      let leftX = e.clientX - distanceX; //表示被拖动的元素离父元素的左边距
      let topY = e.clientY - distanceY;
      let maxLeftX = content.offsetWidth - dragableBox.offsetWidth; //　被拖动的div能拖动的最大宽度
      let maxTopY = content.offsetHeight - dragableBox.offsetHeight;
      // 保证被移动的div不被移动到浏览器可视区域外
      if (leftX < 0) {
        leftX = 0;
      } else if (leftX > maxLeftX) {
        // 当被拖动的元素离父元素的左边距大于
        leftX = maxLeftX;
      }
      if (topY < 0) {
        topY = 0;
      } else if (topY > maxTopY) {
        topY = maxTopY;
      }

      dragableBox.style.left = leftX + "px";
      dragableBox.style.top = topY + "px";    

      proccessIntersect(topY, pageHeight, pageGap, dragableBox, pageContent)

      // 记录最后一次的坐标
      lastTop = topY
    };
    document.onmouseup = function (e) {
      const legalityPos = getLegalityPos(lastTop, pageHeight, dragableBoxHeight, pageGap)
      const { top, page, currentPageTop } = legalityPos
      // 因为有拖动吸附效果，所以需要重新设置进入目标元素的背景色
      const targetElement = proccessBg(page, pageContent)
      targetElement.style.backgroundColor = "#b6e0c5";

      dragableBox.style.top = top + "px";
      dragableBox.innerText = `拖动到第${page}页了`
      document.onmousemove = document.onmouseup = null;      
    };
  };

})();
