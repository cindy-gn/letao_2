//这是都是一些功的部分 ,写在这里为了复用

//进度条功能
//注册Ajax  的全局事件 ,当发送Ajax 请求时  开始进度条   请求结束后  关闭进度条
// 在发送第一个ajax请求, 开启进度条
// 在全部的ajax回来, 关闭进度条

// ajax全局事件
// .ajaxComplete(fn);   每个ajax完成时, 都会调用fn回调函数   (完成: 不管成功还是失败)
// .ajaxSuccess(fn);    每个ajax只要成功了, 就会调用fn
// .ajaxError(fn);      每个ajax只要失败了, 就会调用fn
// .ajaxSend(fn);       每个ajax发送前, 都会调用fn

// .ajaxStart(fn);      在第一个ajax开始发送时, 调用fn
// .ajaxStop(fn);       在全部的ajax完成时, 调用fn  (不管成功还是失败)
$(document).ajaxStart(function(){
    NProgress.start();
})

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },2000)
})












