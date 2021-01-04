(()=>{

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDLtt-DGO8AAlvFoIjHRNJrPNzOzK5CbF4",
        authDomain: "bookbusphdev.firebaseapp.com",
        databaseURL: "https://bookbusphdev.firebaseio.com",
        projectId: "bookbusphdev",
        storageBucket: "bookbusphdev.appspot.com",
        messagingSenderId: "283485482380",
        appId: "1:283485482380:web:3dd826e2a17e604d0d7aa9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var loginEmail  = document.getElementById('adminEmail');
    var loginPass   = document.getElementById('adminPassword');
    var login       = document.getElementById('adminLoginBtn');
    var loginError  = document.getElementById('loginErr');
    var emailErr    = document.getElementById('adminErr1');
    var passErr     = document.getElementById('adminErr2');

    login.addEventListener('click', e=>{
        if(loginEmail.value == "" && loginPass.value == ""){
            emailErr.classList.remove('hide');
            passErr.classList.remove('hide');
        }else if(loginEmail.value != "" && loginPass.value == ""){
            emailErr.classList.add('hide');
            passErr.classList.remove('hide');
        }else if(loginEmail == "" && loginPass.value != ""){
            emailErr.classList.remove('hide');
            passErr.classList.add('hide');
        }else{
            emailErr.classList.add('hide');
            passErr.classList.add('hide');

            var email = loginEmail.value;
            var pass = loginPass.value;

            firebase.auth().signInWithEmailAndPassword(email, pass).then(function(){
                loginError.classList.add('hide');
            }).catch(function(error) {
                loginEmail.value = "";
                loginPass.value = "";
                loginError.classList.remove('hide');
                loginError.textContent = error.message;
            });
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.uid == 'UN0tH2E8HXR76IjtdTLeeqMN5ws2'){
                window.location = 'welcome.html';
            }
        } else {
            //nothing to do
            console.log('no user logged in');
        }
    });
})();