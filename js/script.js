$( document ).ready(function() {
		
	$('#reg').click(function(){
		$('#loginForm')[0].reset();
		$('.wrapModal').show();
		$('#regForm').show();
		$('#hideModal').show();
	});
	
    $('#hideModal').click(function(){
		$('.wrapModal').children().hide();//стереть данные форм?
		$('.wrapModal').hide();
		$('#regForm')[0].reset();
	});
	
	$('#regForm').submit(
		function(event) {
			event.preventDefault();
			var str = $(this).serialize();			
			$.ajax(
				{
					type: 'POST',
					url: 'index.php/welcome/reg',
					data: str,
					success: function(resp) {
						var r = JSON.parse(resp);
						console.log(r);
						if(+r[0]) {
							var hi = 'Привет, ' + r[1];
							$('#test').html(hi);
							
							$('#regForm')[0].reset();
							$('#regForm').hide();
							$('.wrapModal').hide();
							$('#loginForm').hide();
							$('#tasksWrap').show();
						}
						else {
							$('#errors').html(r[1]);
						}
						
					},
					error: function() {
						console.log("fuck");
					}
				}
			);
			return false;
		}
	);
	
	$('#loginForm').submit(
		function(event) {
			event.preventDefault();
			var str = $(this).serialize();
			$.ajax(
				{
					type: 'POST',
					url: 'index.php/welcome/loginUser',
					data: str,
					success: function(resp) {
						console.log(JSON.parse(resp));
						var r = JSON.parse(resp);
						if(+r[0]) {
							var hi = 'Привет, ' + r[1];
							$('#test').html(hi);
							
							$('#loginForm')[0].reset();
							$('#loginForm').hide();
							$('#tasksWrap').show();
							
							/*for(i = 0; i < r[1].length; i++) {
								var row = $('<tr></tr>');
								row.attr('data-id', r[1][i].id);
								row.html(`<td>${r[1][i].id}</td>`);
								$(`<td>${r[1][i].title}</td>`).appendTo(row);
								$(`<td>${r[1][i].task}</td>`).appendTo(row);
								$('<td>удалить</td>').appendTo(row);
								$('<td>изменить</td>').appendTo(row);
								row.appendTo('#tasks');
							}*/
						}
						else {
							$('#test').html(r[1]);
						}
					},
					error: function() {
						console.log("fuck");
					}
				}
			);
			return false;
		}
	);
	
	$('#out').click(function() {
		var str = {'out' : 1};
		$.ajax(
			{
				type: 'POST',
				url: 'index.php/welcome/logout',
				data: str,
				success: function(resp) {
					if(+resp) {
						/*$('#tasks').empty();
						$('#addTask')[0].reset();*/
						$('#tasksWrap').hide();
						$('#test').html('check');
						$('#loginForm').show();
						//$('#alert').html('');
					} 
					else {
						$('#test').html('не вышли');
					}
				},
				error: function() {
					console.log("fuck");
				}
			}
		);
		return false;		
	});
	
});