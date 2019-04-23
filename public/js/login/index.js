$(function(){
    $("#register").on('click',()=>{
        var password = $("#password").val();
        var username = $("#username").val();
        $.ajax({
            type:"post",
            url:'/api/user/register',
            data:{
                username,
                password
            },
            dataType:'json',
            success:(data)=>{
              $("#js-server-helpinfo").html(data.message);
                if(!data.code){
                    $("#password").val('');
                    $("#username").val('');
                    setTimeout(() => {
                         $("#js-server-helpinfo").html("请登录");
                    }, 999);
                }
            }
        })
    })

    $("#js-btn-login").on('click',(e)=>{
        e.preventDefault();
        var password = $("#password").val();
        var username = $("#username").val();
        $.ajax({
            type:"post",
            url:'/api/user/login',
            data:{
                username,
                password
            },
            dataType:'json',
            success:(data)=>{
            //   $("#js-server-helpinfo").html(data.message);
                console.log(data)
            }
        })
    })
})