



    //发送请求获取数据,动态的渲染页面
    $(function () {
        var currentPage = 1; //默认的当前页的页码
        var pageSize = 5;    //默认的当前页有多少条数据

        var currentId;//声明一个变量存储当前正在编辑的用户, 的id
        var isDelete; //标记修改用户成什么状态


        render();//一斤页面就调用一次 ,获取里面的数据的条数  渲染页码


        function render() {
            //发送请求
            $.ajax({
                type: "get",
                url: "/user/queryUser",
                data: {
                    page: currentPage,
                    pageSize: pageSize
                },
                // dataType:"json",
                success: function (info) {
                    // console.log(info);//获取到的数据就是一个对象  不用转换
                    // 将数据与模板进行绑定  
                    //参数1:  是模板的id  
                    //参数2:  是返回来的数据
                    var htmlStr = template("tpl", info);
                    //把元素添加到模板里面  渲染到页面
                    $(".lt_content tbody").html(htmlStr);


                    //再成功的回调函数里面配置分页
                    $("#paginator").bootstrapPaginator({
                        //指定这个插件的版本
                        bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                        currentPage: info.page,//当前页
                        totalPages: Math.ceil(info.total / info.size),//总页数
                        // size:"small",//设置控件的大小，mini, small, normal,large
                        //点击时被触发
                        onPageClicked: function (event, originalEvent, type, page) {
                            //为按钮绑定点击事件 page:当前点击的页码

                            currentPage = page;
                            render();
                        }
                    });


                }
            })




        }



        //注册事件委托  需要的获取的元素 是这个页面上本身就有的属性
        $(".lt_content tbody").on("click", ".btn", function () {
            // console.log("haha");
            $("#userModal").modal("show");

            //获取当前这条数据的id 判断是否有那个类名  btn-success 
            //如果是1  就是有  0  没有
            currentId = $(this).parent().data("id");
            isDelete = $(this).hasClass("btn-success") ? 1 : 0;
            // console.log(id);
            // console.log(isDelete);

            //先取消注册的点击事件,再注册  保证只有一个事件绑定在这个按钮上
            $("#submitBtn").off("click").on("click", function () {
                //点击后确定  发送请求 修改状态 就修改状态是正常 还是禁用
                $.ajax({
                    type: "post",
                    url: "/user/updateUser",
                    data: {
                        id: currentId,
                        isDelete: isDelete
                    },
                    dataType:"json",
                    success: function (info) {
                        console.log(info);
                        if (info.success) {
                            //成功,修改数据模态框隐藏,重新渲染页面
                            //modal  方法  是这个里面模态框插件里面的方法  里面的值也是
                            $("#userModal").modal("hide");
                            render();
                        }
                    }
                })
            })



        })









    });