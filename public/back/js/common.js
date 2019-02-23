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
$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 2000)
})


$(function () {
    //点击切换类名  让一级菜单显示或者隐藏
    $(".categroy").on("click", function () {
        // console.log(111);
        $(this).next().stop().slideToggle();
        
    })

    //点击按钮,左边的侧边栏显示隐藏
    $(".icon_menu").on("click",function(){
        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_aside").toggleClass("hidemenu");
    })


    //3.退出按钮  显示模态框
    $(".icon_logout").on("click",function(){
        //模态框显示
        $("#logoutModal").modal("show");
    })

    //点击模态框的确认按钮  退出登录信息
    // id="logoutBtn"
    $("#logoutBtn").on("click",function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="login.html"
                }
                
            }
        })
    })














})











