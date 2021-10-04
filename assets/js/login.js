$(function(){
	
	//点击去注册账号的链接
	$('#link_reg').on('click', function(){
		$('.login-box').hide();
		$('.reg-box').show();
	})
	
	//点击'去登录'的链接
	$('#link_login').on('click', function(){
		$('.reg-box').hide();
		$('.login-box').show();
	})
	
	//从layui中获取form对象
	var form = layui.form;
	var layer = layui.layer;
	//通过form.verify()函数自定义效验规则
	form.verify({
		//自定义了一个叫做pwd效验规则
		pass: [
		    /^[\S]{6,12}$/
		    ,'密码必须6到12位，且不能出现空格'
		],
		//效验两次密码是否一致
		repass: function(value){
			//通过形参拿到的是确认密码框中的内容
			//还需要拿到密码框中的内容
			//然后进行一次等于的判断
			//如果判断失败，则return一个提升
			var pass = $('.reg-box [name=password]').val();
			if(pass !== value){
				return '两次密码不一致';
			}
		}
	})
	
	//监听注册表单提交事件
	$('#form_reg').on('submit', function(e){
		//阻止默认提交行为
		e.preventDefault();
		//发起ajax的post请求
		$.post('/api/reguser', {
			username: $('#form_reg [name=username]').val(),
			password: $('#form_reg [name=password]').val()
		},function(res){
			if(res.status != 0) //return console.log(res.message);
			return layer.msg(res.message);
			//console.log('注册成功')
			layer.msg('注册成功，请登录!');
			//模拟人的点击行为
			$('#link_login').click();
		})
	})
	
	//监听登录表单的提交事件
	$('#form_login').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: $(this).serialize(),
			success: function(res){
				if(status != 0) //return console.log(res.message);
				return layer.msg('登录失败!');
				layer.msg('登录成功');
				//console.log(res.token);
				//将登录成功得到的token字符串，保存到localStorage中
				localStorage.setItem('token', res.token);
				//跳转到后台主页
				location.href = 'index.html';
			}
		})
	})
})