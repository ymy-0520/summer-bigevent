$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // console.log(options.url);
  // 处理请求头信息
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
  // 处理地址
  // $.ajax(function (options) {
  //   options.url = "http://ajax.frontend.itheima.net" + options.url;
  //   // 处理请求头信息
  //   if (options.url.indexOf("/my/") !== -1) {
  //     // indexOf 返回的是某个指定字符串在字符串中首次出现的位置，如果没有找到返回的是-1

  //     options.headers = {
  //       Authorization: localStorage.getItem("token"),
  //     };
  //   }
  // });

  // 处理地址
  // $.ajaxPrefilter(function (options) {
  //   options.url="http://ajax.frontend.itheima.net"+options.url;
  //   // 处理请求头
  //   if(options.url.indexOf!==-1){
  //     options.headers={
  //       Authorization:localStorage.getItem('token'),
  //     }
  //   }
  //  })

  //控制用户访问权限，complete函数无论请求是否发送成功，都会执行代码
    // options.complete = function (xhr) {
    //   console.log(xhr);
    //   if (
    //     xhr.responseJSON.status === 1 &&
    //     xhr.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 返回登录页面，重新登录，同时把token清除
    //     localStorage.removeItem("token");
    //     location.href = "login.html";
    //   }
    // };

  options.complete = function (xhr) {
    if (
      xhr.responseJSON.status === 1 &&
      xhr.responseJSON.message === "身份认证失败！"
    ){
      // 用户信息不对，返回login登录页面，同时删除token参数
      localStorage.removeItem("token");
    location.href = "login.html";

    }
  };
});
