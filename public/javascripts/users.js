/**
 * Created by zhangmingjie on 2017/7/7.
 */
var usr = null;

function login(){
	var username = document.getElementById("login_username").value;
	var password = document.getElementById("login_password").value;
	// alert(username);


}

function openLogin(){
    closeRegister();
	document.getElementById("win").style.display="";
}


function closeLogin(){
   document.getElementById("win").style.display="none";
}

function register(){
	var username = document.getElementById("register_username").value;
	var password = document.getElementById("register_password").value;



}


function openRegister(){
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