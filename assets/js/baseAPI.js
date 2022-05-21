// 请求拦截器
$.ajaxPrefilter((option) => {
  // 请求之前给有权限的接口注入token
  if (option.url.includes('/my/')) {
    option.headers = {
      Authorization: localStorage.getItem('token')
    };
  }
  option.url = `http://www.liulongbin.top:3007` + option.url;
  // 统一处理权限问题
  option.complete = (res) => {
    console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };
});
