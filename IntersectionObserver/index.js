/**
 * 传统的实现方法是，监听到scroll事件后，调用目标元素（绿色方块）的getBoundingClientRect()方法，
 * 得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题。
 * IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。
 * 规格写明，IntersectionObserver的实现，应该采用requestIdleCallback()，即只有线程空闲下来，才会执行观察器。
 * 这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。
 *  
 * Intersection Observer API 不能告诉你的一件事情是 (两个元素的)重叠部分的准确像素个数或者重叠的像素属于哪一个元素。
 * 然而这个API覆盖最广的最常用的使用方式是"如果两个元素发生的交集部分在N%左右，我需要做处理一些事情(执行回调)"
 * 
 *  当页面滚动时，懒加载图片或其他内容。
    实现“可无限滚动”网站，也就是当用户滚动网页时直接加载更多内容，无需翻页。
    为计算广告收益，检测其广告元素的曝光情况。
    根据用户是否已滚动到相应区域来灵活开始执行任务或动画。

 * reference: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
 * http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
 * // 开始观察
    io.observe(document.getElementById('example'));
    // 停止观察
    io.unobserve(element);
    // 关闭观察器
    io.disconnect();

  *
  * 
 */
(function(){

  const io = new IntersectionObserver(function(entries){
    /**
     * {
     * //可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
        time: 3893.92,  
        根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
        rootBounds: ClientRect {
          bottom: 920,
          height: 1024,
          left: 0,
          right: 1024,
          top: 0,
          width: 920
        },
        目标元素的矩形区域的信息
        boundingClientRect: ClientRect {
          // ...
        },
        目标元素与视口（或根元素）的交叉区域的信息
        intersectionRect: ClientRect {
          // ...
        },
        是否相交
        isIntersecting: false
        目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
        intersectionRatio: 0.54,
        被观察的目标元素，是一个 DOM 节点对象
        target: element 
      }
    */
    console.log(entries)
  },{
    root: document.querySelector('.wrap'), 
    threshold: 0.1 // 会执行两次，从0->1, 1->0 只要交叉面积超过10%就会执行
  })

  io.observe(document.getElementById("content1"))
  io.observe(document.getElementById("content2"))

})()