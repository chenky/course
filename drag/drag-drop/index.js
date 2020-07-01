/**
 * reference：https://blog.csdn.net/feifanzhuli/article/details/90386129
 * 
 * 功能：1. 拖动， 2. 限定范围， 3. 吸附效果 4. 拖动进入目标元素变色
 * 备注：目前没有做兼容处理，可能存在兼容性问题
 * 演示：先演示，再画图，再讲代码（html，css，js）
 * 拖放事件
    被拖放的元素称为源对象
    经过的元素称为过程对象
    到达的元素称为目标对象
  源对象
    dragstart：源对象开始拖放。
    drag：源对象拖放过程中。
    dragend：源对象拖放结束。
  过程对象
    dragenter：源对象开始进入过程对象范围内
    dragover：源对象在过程对象范围内移动。
    dragleave：源对象离开过程对象的范围。
  目标对象
    drop：源对象被释放时触发。
    凡是在页面内都认为是过程对象，所以要阻止document的dragover的默认行为

  被拖放元素的 draggable 属性需设置为 true
*/
(function () {
  const dragableBox = document.getElementById("dragable-box");
  // const content = document.getElementById("content");
  const pageContent = document.getElementById("page-content");
  const {
    offsetWidth: pageWidth,
    offsetHeight: pageHeight,
  } = pageContent.children[0];
  const {
    offsetWidth: dragableBoxWidth,
    offsetHeight: dragableBoxHeight,
  } = dragableBox;
  const pageGap = 20;
  // 默认在第一页
  let lastPage = 1;
  let disx = 0;
  let disy = 0;

  // 被拖动框只能在限定范围，并且不可以在间隙中
  function getLegalityPos(
    left,
    top,
    pageWidth,
    pageHeight,
    dragableBoxWidth,
    dragableBoxHeight,
    pageGap
  ) {
    // 每页的高度加上页与页之间的间隙
    const pageOutHeight = pageHeight + pageGap;
    // 相对当前页的top坐标
    const remainder = top % pageOutHeight;
    // 拖动到第几页了, 如果算出来是0，则需要改成第一页
    const currentPage = Math.ceil(top / pageOutHeight) || 1;
    const resPos = {};
    if (remainder >= 0 && remainder <= pageHeight - dragableBoxHeight) {
      // 说明没有跨页，就在第一页
      resPos.page = currentPage;
      resPos.top = top;
      // 相对当前页的定位
      resPos.currentPageTop = remainder;
    } else {
      // 跨页了，需要根据签章的大于一半的部分在哪一页，然后移动到哪一页
      // 如果remainder<=每页高度-(签章高度-间距)/2, 说明要移动到前面一页，否则就是后面一页
      if (remainder <= pageHeight - (dragableBoxHeight - pageGap) / 2) {
        // 移动到前一页
        resPos.page = currentPage;
        resPos.top =
          currentPage * (pageHeight + pageGap) - pageGap - dragableBoxHeight;
        // 相对当前页的定位
        resPos.currentPageTop = pageHeight - dragableBoxHeight;
      } else {
        // 移动到下一页
        resPos.page = currentPage + 1;
        resPos.top = currentPage * (pageHeight + pageGap);
        // 相对当前页的定位
        resPos.currentPageTop = 0;
      }
    }
    const tempLeft =
      left <= 0 ? 0 : Math.min(left, pageWidth - dragableBoxWidth);
    resPos.left = tempLeft;
    resPos.currentPageLeft = tempLeft;
    return resPos;
  }

  /**
   * 源对象拖动
   */
  dragableBox.addEventListener(
    "dragstart",
    function (event) {
      // 使其半透明
      const { target, clientX, clientY } = event;
      const { id, style, offsetLeft, offsetTop } = target;
      style.opacity = 0.5;
      disx = clientX - offsetLeft;
      disy = clientY - offsetTop;
      event.dataTransfer.setData("text/plain", id);
      event.dataTransfer.effectAllowed = "move";
    },
    false
  );

  dragableBox.addEventListener(
    "dragend",
    function (event) {
      // console.log('dragend')
      // 重置透明度
      event.target.style.opacity = "";
    },
    false
  );

  /**
   * 过程对象
   */
  /* 放置目标元素时触发事件 */
  pageContent.addEventListener(
    "dragover",
    function (event) {
      // 阻止默认动作以启用drop
      event.preventDefault();
    },
    false
  );

  pageContent.addEventListener(
    "dragenter",
    function (event) {
      // 当可拖动的元素进入可放置的目标时高亮目标节点
      if (event.target.className == "dropzone") {
        event.target.style.backgroundColor = "#b6e0c5";
      }
    },
    false
  );

  pageContent.addEventListener(
    "dragleave",
    function (event) {
      // 当拖动元素离开可放置目标节点，重置其背景
      if (event.target.className == "dropzone") {
        event.target.style.backgroundColor = "";
      }
    },
    false
  );

  /**
   * 目标对象
   */
  pageContent.addEventListener(
    "drop",
    function (event) {
      // 阻止默认动作（如打开一些元素的链接）
      event.preventDefault();
      // event.dataTransfer.dropEffect = "move"
      const { target, clientX, clientY } = event;

      const dragObjId = event.dataTransfer.getData("text/plain");
      const dragObj = document.getElementById(dragObjId);
      const left = clientX - disx;
      const top = clientY - disy;

      // 取到合法的位置信息，包括left，top，currentLef，currentTop，page
      const legalPos = getLegalityPos(
        left,
        top,
        pageWidth,
        pageHeight,
        dragableBoxWidth,
        dragableBoxHeight,
        pageGap
      );

      // 相对整个文档列表左上角坐标
      dragObj.style.left = legalPos.left + "px";
      dragObj.style.top = legalPos.top + "px";
      // console.log('currentPageLeft, currentPageTop', legalPos.currentPageLeft, legalPos.currentPageTop)

      const { page: currentPage } = legalPos;
      dragObj.innerText = `拖动到第${currentPage}页了`;

      // 只有跨页了并且拿到了dropzone元素，才需要移动拖动框
      if (lastPage !== currentPage) {
        if (target.className == "dropzone") {
          dragObj.parentNode.removeChild(dragObj);
          target.appendChild(dragObj);
        }

        pageContent.children[lastPage - 1].style.backgroundColor = "";
        pageContent.children[currentPage - 1].style.backgroundColor = "#b6e0c5";
        lastPage = currentPage;
      }
      // console.log('drop')
    },
    false
  );
})();
