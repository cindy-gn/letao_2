

//表单校验插件
$(function(){
    //1.使用表单校验插件
$("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2-6位之间'
          },
          callback:{
              message:"用户名不存在"
          }

        }
      },
      password:{
          validators:{
              notEmpty:{
                  message:"密码不能为空"
              },
              stringLength:{
                min:6,
                max:12,
                message:"密码为6-12位"
              },
              callback:{
                  message:"密码错误"
              }
          }
      }
    }
  
  });



//   2.发送请求判断是否有数据
//有就跳转到首页,没有就重新输入
    // 2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
    // (1) 校验成功, 此时会默认提交, 发生页面跳转,  注册表单校验成功事件, 
    // 在事件中阻止默认的跳转提交, 通过ajax提交
    // (2) 校验失败, 自动拦 截提交

    /*  
        button 按钮的类型是submit  时,会进行表单提交  此时表单校验插件会立刻进行校验
        submit 会进行表单提交   此时表单校验插件会立刻进行表单校验
        如果校验成功  页面会发生跳转   注册表单校验成功事件  ,再事件中阻止默认的跳转
        如果失败  会自动拦截

    */
   $("#form").on("success.form.bv",function(e){
    // console.log(e);
    //阻止默认的跳转事件
    e.preventDefault();
    //发送ajax  请求进行表单数据提交
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        dataType:"json",
        data:$("#form").serialize(),
        success:function(info){
            // console.log(info);
            if(info.success){
                // console.log("登录成功");
                location.href="index.html"
                
            }
            if(info.error==1000){
                // console.log("用户名不存在");
                //提示错误信息
                $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                
            }
            if(info.error==1001){
                // console.log("密码错误");
                $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
            }
            
        }
    })
    
   })





   //3.重置按钮,重置时,清空里面的内容和提示状态
//    reset  默认会将内容清空   我们只需要清空提示的状态就可以
   ///给重置按钮注册点击事件
   //可以通过类名找到  也可以用选择器找
//    $("[type='reset']")     $(".pull-left")
    $("[type='reset']").on("click",function(){
    //    console.log(1111);
    $("#form").data("bootstrapValidator").resetForm();
       
   })















});