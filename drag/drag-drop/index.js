/**
 * reference：https://blog.csdn.net/feifanzhuli/article/details/90386129
 * 
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

  /**
   * 源对象拖动
   */
  dragableBox.addEventListener(
    "dragstart",
    function (event) {
      // 使其半透明
      event.target.style.opacity = 0.5;
    },
    false
  );

  dragableBox.addEventListener(
    "dragend",
    function (event) {
      // 重置透明度
      event.target.style.opacity = "";
    },
    false
  );

  /**
   * 过程对象
   */
  /* 放置目标元素时触发事件 */
  document.addEventListener(
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
      // 将拖动的元素到所选择的放置目标节点中
      if (event.target.className == "dropzone") {
        // console.log('this is drop zone')
        event.target.style.backgroundColor = "";
        dragableBox.parentNode.removeChild(dragableBox);
        event.target.appendChild(dragableBox);
      }
    },
    false
  );
})();