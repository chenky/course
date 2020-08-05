/**
 * 惰性求值，懒运算，按需索取，能不多做就不多做
 * 找出自然整数中小于 10000 的同时是乘方数和奇数的数字，再把这些数加总。
 * haskell代码：
 * sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
*/

// javascript懒运算首先想到的是generator
const numbers = function*() {
  let i = 1
  while (true) {
  yield i++
  }
}

function LazyChain(obj) {
  this._calls  = []; // 用于缓存待执行函数的数组 thunk
  this._target = obj; // 目标对象
}

LazyChain.prototype.invoke = function(methodName /*, args */) { // 将函数压入的方法
  var args = _.rest(arguments);

  this._calls.push(function(target) {
    var meth = target[methodName];

    return meth.apply(target, args);
  });

  return this;
};

LazyChain.prototype.force = function() { // 强制执行this._calls中的函数
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
};
// 使用，直到force方法被调用才将 concat, sort,join执行
new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .invoke('join',' ')
    .force();

