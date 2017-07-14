/**
 * Created by zhangmingjie on 2017/7/7.
 */
var usr = null;

function login(){
	var username = document.getElementById("login_username").value;
	var password = document.getElementById("login_password").value;
	// alert(username);
  var url = '/users/login_check';
  var params = [
      'username=' + username.toString(),
      'password=' + password.toString()
  ];
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4) {
          var responseHeaders = req.getAllResponseHeaders();
          var check = req.responseText;
          if (check === '1') {
              document.getElementById("username_change").innerHTML = username;
              closeLogin();
          }
          else {
              document.getElementById("login_error").style.display="";
          }
      }
  };
  req.open('GET', url + '?' + params.join('&'), true);
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  req.send(null);

}

function openLogin(){
  document.getElementById("login_error").style.display="none";
    closeRegister();
	document.getElementById("win").style.display="";
}


function closeLogin(){
   document.getElementById("win").style.display="none";
}

function register(){
	var username = document.getElementById("register_username").value;
	var password = document.getElementById("register_password").value;
  var password_again = document.getElementById("register_password_again").value;

  if (password != password_again){
     document.getElementById("register_error_2").style.display="";
     return;
  }


  var url = '/users/register';
  var params = [
      'username=' + username.toString(),
      'password=' + password.toString()
  ];
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (req.readyState === 4) {

          var responseHeaders = req.getAllResponseHeaders();
          var check = req.responseText;
          check = JSON.parse(check);
          if (check["msg"] === "已存在的用户名") {
            document.getElementById("register_error_1").style.display="";
          }
          else{
            document.getElementById("username_change").innerHTML = username;
            closeRegister();
          }
      }
  };
  req.open('GET', url + '?' + params.join('&'), true);
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  req.send(null);

}


function openRegister(){
  document.getElementById("register_error_1").style.display="none";
  document.getElementById("register_error_2").style.display="none";

    closeLogin();
	document.getElementById("reg").style.display="";
}

function closeRegister(){
   document.getElementById("reg").style.display="none";
}


function check_user(){
    if(usr === null)
        return 0;
    else
        return 1
}