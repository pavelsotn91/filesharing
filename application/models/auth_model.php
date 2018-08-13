<?
class auth_model extends CI_Model {
	public function loginUser($login, $pass) {
		$this->load->database();

		$query = $this->db->query("SELECT id, password FROM users WHERE login = '".$login."'");
		
		if($query->num_rows() !== 0) {
			$row = $query->row();
			if( password_verify($pass, $row->password) ) {
				$_SESSION['loggedUserId'] = $row->id;
				$_SESSION['loggedUserLogin'] = $login;
				return [1, $login];
			}
			else {
				return [0, password_verify($pass, $row->password), 'Неверный пароль', password_hash($pass, PASSWORD_DEFAULT), $row->password];
			}
		}
		else {
			return [0, 'Пользователя с таким логином не существует'];
		}
	}
	
	public function regUser($login, $pass, $email) {
		$this->load->database();

		$query = $this->db->query("SELECT login FROM users WHERE login = '".$login."'");
		
		if($query->num_rows() !== 0) {
			return [0, 'Пользователь с таким логином зарегистрирован'];
		}
		else {
			$query = $this->db->query("SELECT email FROM users WHERE email = '".$email."'");
			if($query->num_rows() !== 0) {
				return [0, 'Пользователь с таким email зарегистрирован'];
			}
			else {
				$password = password_hash($pass, PASSWORD_DEFAULT);
				$toPaste = array(
					'login' => $login,
					'email' => $email,
					'password' => $password
				);
				$this->db->insert('users', $toPaste);
				$_SESSION['loggedUserId'] = $this->db->insert_id();
				$_SESSION['loggedUserLogin'] = $login;
				return [$this->db->affected_rows(), $login];
			}
		}
	}
	
}
?>