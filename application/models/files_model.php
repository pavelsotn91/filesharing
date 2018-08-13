<?
class files_model extends CI_Model {
	public function getFiles() {
		$this->load->database();
		$files = array();
		if( isset($_SESSION['loggedUserId']) ) {
			$query = $this->db->get_where('files', array('user_id' => $_SESSION['loggedUserId']));
		}
		else {
			$query = $this->db->get('files');
		}
		foreach ($query->result() as $row) {
			$files[] = $row;
		}
		return $files;
	}
}
?>