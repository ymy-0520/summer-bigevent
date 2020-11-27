$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // console.log(options.url);
  // 处理请求头信息
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
//控制用户访问权限
 options.complete=function (xhr) { 
        // console.log( xhr );
        if(xhr.responseJSON.status===1 && xhr.responseJSON.message==='身份认证失败！'){
            // 返回登录页面，重新登录，同时把token清除
            localStorage.removeItem('token');
            location.href='login.html';
        }
     }
});
