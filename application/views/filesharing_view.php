<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Filesharing</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<span id="test"><?= isset($_SESSION['loggedUserLogin']) ? 'Привет, '.$_SESSION['loggedUserLogin'] : 'check' ?></span>
	<div class = "wrapModal">
<!-- Registration form -->
	<form id="regForm">
		<p>
			<input type="text" name="login" placeholder="Введите login">
		</p>
		<p>
			<input type="email" name="email" placeholder="Введите email">
		</p>
		<p>
			<input type="password" name="pass" placeholder = "Введите пароль" >
		</p>
		 <p>
			<input type="password" name="pass2" placeholder = "Введите пароль еще раз">
		</p>
		<input type = 'submit' name = "doSignUp" value = "Зарегистрироваться">	
	</form>
<!-- Update form -->	
	<form id = 'updateTask' >
		<p>
			<input type = "text" name = "title" placeholder = "Введите заголовок задачи">
		</p>
		<p>
			<textarea name="task" cols="30" rows="3"></textarea>
		</p>
		<input type = "submit" name = "updateTask" value = "Изменить задачу">
	</form>
	
	<p id = 'errors'></p>
	<span id="hideModal">X</span>
	</div>

<div class = "container">
<table id = 'files'>
	<?
	foreach($files as $file) {
			echo "<tr data-id = $file->id>";
			echo "<td>$file->filename</td>";
			echo "</tr>";
		}
	?>
</table>
<!-- Login form -->
	<form id = 'loginForm' style = 'display: <?= isset($_SESSION['loggedUserId']) ? 'none' : 'block'?>'>
		<p>
			<input type="text" name="login" placeholder="Введите Ваш login">
		</p>
		<p>
			<input type="password" name="pass" placeholder="Введите Ваш пароль" >
		</p>
		<input type = "submit" name = "enter" value = "Войти">
		
		<span id = 'reg'>Регистрация</span>
	</form>
<!-- Tasks -->
<div id = 'tasksWrap' style = 'display: <?= isset($_SESSION['loggedUserId']) ? 'block' : 'none'?>'>
	<span id = 'out'>Выйти</span>
	<a href="files/index.php" download>Картинка</a>
	<form id = 'addTask' >
		<p>
			<input type="text" name="title" placeholder="Введите заголовок задачи">
		</p>
		<p>
			<textarea name="task" cols="30" rows="3"></textarea>
		</p>
		<input type = "submit" name = "addTask" value = "Добавить задачу">
	</form>
	<p id = 'alert'>Алерт на добавление таски</p>
	<form enctype="multipart/form-data" method="post">
		<p><input type="file" name="f">
		<input type="submit" value="Отправить"></p>
	</form>
</div>

</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/js/script.js"></script>
</body>
</html>