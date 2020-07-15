// 防止单击劫持，不允许页面被iframe嵌入
function banNested() {
  //完全不能嵌套
	/*if(top != window){
		top.location.href = window.location.href;
	}*/
  //同域可嵌套
  try {
    top.location.hostname;
    if (top.location.hostname != window.location.hostname) {
      top.location.href = window.location.href;
    }
  }
  catch (e) {
    top.location.href = window.location.href;
  }
}

/**
 * reference： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options
 * 使用HTTP 响应头信息中的 X-Frame-Options属性, 浏览器已广泛支持的非官方标准
 * 
  deny
  表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
  sameorigin
  表示该页面可以在相同域名页面的 frame 中展示。
  allow-from uri
  表示该页面可以在指定来源的 frame 中展示。
*/
