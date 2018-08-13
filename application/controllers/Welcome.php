<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
	public function __construct() {
		parent::__construct();
		$this->load->library('session');
	}
	
	public function index() {
		$this->load->model('files_model');
		$modelResponse = $this->files_model->getFiles();
		$this->load->view('filesharing_view', ['files' => $modelResponse]);
		// if( empty($_SESSION['loggedUserId']) ) {
			// $this->load->model('files_model');
			// $modelResponse = $this->files_model->getFiles();
			// $this->load->view('filesharing_view', ['files' => $modelResponse]);
		// }
		// else {
			// $this->load->view('filesharing_view');
		// }
	} 
		
	public function reg() {
		if( empty($_SESSION['loggedUserId']) ) {
			$data = $this->input->post();
			
			$errors = array();
			if(trim($data['login']) == '') {
				$errors[] = 'Не введен login';
			}
			if(trim($data['email']) == '') {
				$errors[] = 'Не введен Email';
			}
			if($data['pass'] == '') {
				$errors[] = 'Не введен пароль';
			}
			if($data['pass'] != $data['pass2']) {
				$errors[] = 'Повторный пароль не совпадает';
			}

			if(  empty($errors) ) {
				$this->load->model('auth_model');
				$modelResponse = $this->auth_model->regUser($data['login'],$data['pass'], $data['email']);
				if(!$modelResponse[0]) {
					$errors[] = $modelResponse[1];
				}
				else {
					//echo json_encode($modelResponse);
					echo json_encode($modelResponse);
				}
			} 
			if( !empty($errors) ) {
				echo json_encode([ 0, $errors[0] ]);
			}
		}
		else {
			echo json_encode([ 0, 'ses' ]);
		}
	}
	public function loginUser() 
	{
		if( empty($_SESSION['loggedUserId']) ) {
			$data = $this->input->post();

			$errors = array();
			if( empty(trim($data['login'])) ) {
				$errors[] = 'Не введен login';
			}
			if( empty($data['pass']) ) {
				$errors[] = 'Не введен пароль';
			}
			if(strlen($data['login']) > 25) {
				$errors[] = 'Введен некорректный логин';
			}
			
			if( empty($errors) ) {
				$this->load->model('auth_model');
				$modelResponse = $this->auth_model->loginUser($data['login'],$data['pass']);
				
				if(!$modelResponse[0]) {
					$errors[] = $modelResponse[1];
				}
				else {
					echo json_encode($modelResponse);
				}
				
			}
			if( !empty($errors) ) {
				echo json_encode([0, $errors[0]]);
			}
		}
	}
	public function logout()
	{
		$data = $this->input->post();
		if($data['out']) {
			unset($_SESSION['loggedUserId'], $_SESSION['loggedUserLogin']);
			echo 1;
		} else {
			echo 0;
		}
	}
}
?>