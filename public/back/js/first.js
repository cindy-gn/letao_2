

// 打开页面发送请求  获取数据渲染页面
$(function () {
    var currentPage = 1;
    var pageSize = 5;


    render()
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("firstTpl", info);
                $("tbody").html(htmlStr);



                //成功的回调函数里面配置页面的分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,//当前页
                    //总页数
                    totalPages: Math.ceil(info.total / info.size),
                    //给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };


    //点击显示模态框
    $("#addBtn").on("click", function () {

        $("#addModal").modal("show");

    });

    // // 表单校验
    $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置需要校验的字段列表
        fields: {
            categoryName: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '请输入分类名称'
                    }
                }
            }
        }
    });


    // 表单校验成功事件
    $("#form").on("success.form.bv",function(e){

        //阻止默认的跳转
        e.preventDefault();

        //发送请求,添加数据到页面
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:'json',
            success:function(info){
                if(info.success){

                    currentPage=1;
                    render();

                    // 关闭模态
                    $("#addModal").modal("hide");
                    //重置表单里面的内容
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })








});