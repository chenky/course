// 防止用户在一个请求没有响应回客户端，就去重复发请求

// 如果使用jquery类库的ajax，则添加一个serialAjax
// 同时支持promise和普通回掉函数的写法，防止重复，防重
// 同一个请求只有当前请求返回后，才允许用户再次请求，但不同请求不受影响可以并行发送
(function ($) {
  /**
   * 阻止ajax重复提交，guid异步请求唯一标示符
   * @param  {JSON object} settings 等同ajax中的settings参数
   * @return {[type]}          [description]
   */
  $.serialAjax = function (settings) {
    const guid = settings.guid || settings.url
    if ($.serialAjax[guid] === "isProcessing") {
      // code，msg可以根据需求自己定义
      return $.Deferred().resolve( { code: 1001, msg: '当前请求正在提交，无法重复提交，待请求完成方可再次提交'  } );
    }
    $.serialAjax[guid] = "isProcessing";
    return $.ajax(settings).always(function () {
      delete $.serialAjax[guid];
    });
  };
})(jQuery);

// 如果使用的是axios类库一样可以封装函数
// 防重，防止重复提交axios
// 防止重复提交，同一个请求（url+params作为key区分）串行发送请求
function serialRequest(config) {
  if (!config.url) {
    throw new Error('提交的url不能为空')
  }
  let guid = config.serialId
  if (!guid) {
    let { url, params } = config
    // 需要使用qs对params对象转换成string
    params = qs.stringify(params)
    guid = url + (typeof params === 'string' ? params : '')
  }
  if (this.serialRequest[guid]) {
    // 当前请求正在提交中，待请求返回后方可再次提交
    // console.log('当前请求正在提交中，待请求返回后方可再次提交')
    return new Promise((resolve, reject) => {
      resolve({ code: 'serial-request', msg: '当前请求正在提交中，待请求返回后方可再次提交' })
    })
  }
  this.serialRequest[guid] = true
  // let self = this
  return axios.request(config).finally(() => {
    // 请求结束重置请求，以允许用户再次提交,重置为null防止内存泄露
    // console.log('数据已经返回，重置请求状态标识符')
    this.serialRequest[guid] = null
  })
}