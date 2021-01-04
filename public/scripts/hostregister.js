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

    $(document).ready(function(){
        $('.parallax').parallax();
        $('.sidenav').sidenav();
        $('.modal').modal({
            dismissible: false
        });
    });

    var uid;
    var db          = firebase.firestore();
    var register    = document.getElementById('hostregBtn');
    var pass2       = document.getElementById('passnotmatch2');
    var pass1       = document.getElementById('passnotmatch1');
    var pass2miss   = document.getElementById('conpassmissing2');
    var pass1miss   = document.getElementById('passmissing1');
    var emailmiss   = document.getElementById('emailmissing');
    var emailadd    = document.getElementById('hostemail');
    var password    = document.getElementById('hostpassword');
    var conpass     = document.getElementById('hostconpass');
    var errorText   = document.getElementById('errorMessage');

    conpass.addEventListener('keyup', e=>{
        if(password.value != conpass.value){
            pass1.classList.remove('hide');
            pass2.classList.remove('hide');
            register.disabled = true;
        }else{
            pass1.classList.add('hide');
            pass2.classList.add('hide');
            register.disabled = false;
        }
    });

    register.addEventListener('click', e=>{
        if(emailadd.value == "" && password.value != "" && conpass.value != ""){
            emailmiss.classList.remove('hide');
            pass1miss.classList.add('hide');
            pass2miss.classList.add('hide');
        }else if(emailadd.value == "" && password.value == "" && conpass.value != ""){
            emailmiss.classList.remove('hide');
            pass1miss.classList.remove('hide');
            pass2miss.classList.add('hide');
        }else if(emailadd.value == "" && password.value != "" && conpass.value == ""){
            emailmiss.classList.remove('hide');
            pass1miss.classList.add('hide');
            pass2miss.classList.remove('hide');
        }else if(emailadd.value != "" && password.value != "" && conpass.value == ""){
            emailmiss.classList.add('hide');
            pass1miss.classList.add('hide');
            pass2miss.classList.remove('hide');
        }else if(emailadd.value != "" && password.value == "" && conpass.value != ""){
            emailmiss.classList.add('hide');
            pass1miss.classList.remove('hide');
            pass2miss.classList.add('hide');
        }else if(emailadd.value != "" && password.value == "" && conpass.value == ""){
            emailmiss.classList.add('hide');
            pass1miss.classList.remove('hide');
            pass2miss.classList.remove('hide');
        }else if(emailadd.value == "" && password.value == "" && conpass.value == ""){
            emailmiss.classList.remove('hide');
            pass1miss.classList.remove('hide');
            pass2miss.classList.remove('hide');
        }else{
            emailmiss.classList.add('hide');
            pass1miss.classList.add('hide');
            pass2miss.classList.add('hide');

            var email   = emailadd.value;
            var pass    = password.value;

            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
                $(document).ready(function(){
                    $('#hostModal').modal('close');
                    $('#loadModal').modal('open');
                });
                errorText.classList.add('hide');
            }).catch(function(error) {
                emailadd.value  = "";
                password.value  = "";
                conpass.value   = "";
                errorText.classList.remove('hide');
                errorText.textContent = error.message;
            });
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            var d = new Date();
            var currentDate = d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();
            db.collection('buscompany').doc(uid).set({
                id: uid,
                company: null,
                address: null,
                dateRegistered: currentDate,
                photo: null,
                validated: false,
                businessPermit: null,
                currentPasssword: password.value,
                stripeaccount: null
            }).then(function(){
                window.location = 'host/index.html';
            });
        } else {
            //nothing to do
            console.log('no user logged in');
        }
    });
})();