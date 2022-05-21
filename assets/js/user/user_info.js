$(function () {
  const form = layui.form;
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
    }
  });

  const initUserinfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg('获取用户信息失败！');
        form.val('formUserInfo', res.data);
      }
    });
  };
  initUserinfo();

//   实现点击重置
  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserinfo();
  });

//   更新用户信息
$('.layui-form').on('submit',function(e) {
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
        type:'POST',
        url:'/my/userinfo',
        data: $(this).serialize(), 
        success: (res) => {
            if(res.status !==0) return layer.msg('更新用户信息失败！');
            layer.msg('更新用户信息成功！')
            // 调用index.js getUserInfo方法重新渲染头像
            window.parent.getUserInfo()
            }
        })
    })
});
