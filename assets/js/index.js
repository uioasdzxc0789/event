$(function () {
  getUserInfo()
})
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg('数据请求失败')
      layer.msg('数据请求成功')
      renderAvatar(res.data)
    }
  })
}
function renderAvatar(user) {
  const name = user.nickname || user.username
  $('#welcome').html(`欢迎 ${name}`)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
    return
  }
  $('.layui-nav-img').hide()
  const firstName = name[0].toUpperCase()
  $('.text-avatar').html(firstName)
}
