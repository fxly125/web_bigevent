$(function(){
	
	var form = layui.form;
	var layer
	form.verify({
		pwd: [
			/^[\S]{6,12}$/,
			'密码必须6位到12位,且不能出现空格'
		],
		samePwd: function(val){
			if(val === $('[name=oldPwd]').val()){
				return '新旧密码不能相同!'
			}
		},
		rePwd: function(val){
			if(val != $('[name=newPwd]').val()){
				return '两次密码不一致！'
			}
		}
		
	})
	
	$('.layui-form').on('submit',function(e){
		e.preventDefault();
		
		$.ajax({
			method: 'POST',
			url: '/my/updatepwd',
			data: $(this).serialize(),
			success: function(res){
				if(res.status !== 0)
					return layui.layer.msg('更新密码失败!');
				layui.layer.msg('更新密码成功!');
				//$('#btnReset').click();
				$('.layui-form')[0].reset();
			}
			
		})
		
	})
	
	
})