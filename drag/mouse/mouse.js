(function () {
  const dragableBox = document.getElementById("dragable-box");
  const content = document.getElementById("content");
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

  dragableBox.onmousedown = function (e) {
    e.stopPropagation();
    const distanceX = e.clientX - this.offsetLeft;
    const distanceY = e.clientY - this.offsetTop;
    document.onmousemove = function (e) {
      let leftX = e.clientX - distanceX; //表示被拖动的元素离父元素的左边距
      let topY = e.clientY - distanceY;
      let maxLeftX = content.offsetWidth - dragableBox.offsetWidth; //　被拖动的ｄｉｖ能拖动的最大宽度
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
      lastTop = topY
    };
    document.onmouseup = function (e) {
      const legalityPos = getLegalityPos(lastTop, pageHeight, dragableBoxHeight, pageGap)
      const { top, page, currentPageTop } = legalityPos
      dragableBox.style.top = top + "px";
      dragableBox.innerText = `拖动到第${page}页了`
      document.onmousemove = document.onmouseup = null;      
    };
  };
})();
