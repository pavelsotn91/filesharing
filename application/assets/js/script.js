$( document ).ready(function() {
	
	$('#test').click(function(){
		console.log(78);
	});
	
    /*$('#hideModal').click(function(){
		$('.wrapModal').children().hide();//стереть данные форм?
		$('.wrapModal').hide();
	});
   
	$('#regForm').submit(
		function(event) {
			event.preventDefault();
			var str = $(this).serialize();			
			$.ajax(
				{
					type: 'POST',
					url: '/reg.php',
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
					url: '/login.php',
					data: str,
					success: function(resp) {
						var r = JSON.parse(resp);
						$('#test').html(r[1]);
						if(+r[0]) {
							var hi = 'Привет, ' + r[2];
							$('#test').html(hi);
							
							$('#loginForm')[0].reset();
							$('#loginForm').hide();
							$('#tasksWrap').show();
							
							for(i = 0; i < r[1].length; i++) {
								var row = $('<tr></tr>');
								row.attr('data-id', r[1][i].id);
								row.html(`<td>${r[1][i].id}</td>`);
								$(`<td>${r[1][i].title}</td>`).appendTo(row);
								$(`<td>${r[1][i].task}</td>`).appendTo(row);
								$('<td>удалить</td>').appendTo(row);
								$('<td>изменить</td>').appendTo(row);
								row.appendTo('#tasks');
							}
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
	
	$('#addTask').submit(
		function(event) {
			event.preventDefault();
			var str = $(this).serialize();
			$.ajax(
				{
					type: 'POST',
					url: '/add_task.php',
					data: str,
					success: function(resp) {
						var r = JSON.parse(resp);
						if(+r[0]) {
							var row = $('<tr></tr>');
							$('<td></td>').html(`${r[1]}`).appendTo(row);
							$('<td></td>').html( $('#addTask [name=title]').val() ).appendTo(row);
							$('<td></td>').html( $('#addTask [name=task]').val() ).appendTo(row);
							$('<td>удалить</td>').appendTo(row);
							$('<td>изменить</td>').appendTo(row);
							row.attr('data-id', r[1]).appendTo('#tasks');
							$('#addTask')[0].reset();
						}
						$('#alert').html(r[1]);
					},
					error: function() {
						console.log("fuck");
					}
				}
			);
			return false;
		}
	);
	
	$('#tasks').on('click', 'tr td:nth-last-child(2)', function() {
		var toDelElem = $(this).parent();
		var str = {'toDel' : toDelElem.data('id')};
		$.ajax(
			{
				type: 'POST',
				url: '/del.php',
				data: str,
				success: function(resp) {
					if(+resp) {
						toDelElem.remove();
						$('#alert').html('Задача удалена!');
					} 
					else {
						$('#alert').html('something wrong!');
					}					
				},
				error: function() {
					console.log("fuck");
				}
			}
		);
		return false;
	});
	
	$('#tasks').on('click', 'tr td:last-child', function() {
		$('.wrapModal').show();
		$('#updateTask').show();
		$('#hideModal').show();
		$('#updateTask').attr('data-id', $(this).parent().data('id'));
	});
	
	$('#updateTask').submit(
		function(event) {
			event.preventDefault();
			var toUpdateId = $(this).attr('data-id');//.data('id') хранит старый id
			var str = $(this).serialize() + '&toUpdate=' + toUpdateId;
			$.ajax(
				{
					type: 'POST',
					url: '/update.php',
					data: str,
					success: function(resp) {
						if(+resp) {
							var taskToUpdate = '#tasks [data-id=' + toUpdateId + ']'; 
							var title = $(taskToUpdate).children()[1];
							var task = $(taskToUpdate).children()[2];
							$(title).html( $('#updateTask [name=title]').val() );
							$(task).html( $('#updateTask [name=task]').val() );
							$('#updateTask')[0].reset();
							$('.wrapModal').children().hide();
							$('.wrapModal').hide();
						}
						else {
							$('#updateTask')[0].reset();
							$('.wrapModal').children().hide();
							$('.wrapModal').hide();
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
				url: '/logout.php',
				data: str,
				success: function(resp) {
					if(+resp) {
						$('#tasks').empty();
						$('#addTask')[0].reset();
						$('#tasksWrap').hide();
						$('#test').html('');
						$('#loginForm').show();
						$('#alert').html('');
					} 
					else {
						$('#alert').html('не вышли');
					}
				},
				error: function() {
					console.log("fuck");
				}
			}
		);
		return false;		
	});/*

});