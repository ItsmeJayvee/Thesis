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
        $('.sidenav').sidenav();
        $('.modal').modal({
            dismissible: false
        });
        $('.datepicker').datepicker({
            yearRange: [1950,2021],
            container: 'body'
        });
        $('select').formSelect();
        $('.collapsible').collapsible();
        $('.dropdown-trigger').dropdown();
    });

    var uid;
    var db          = firebase.firestore();
    var logout      = document.getElementById('logoutBtn');
    var dp          = document.getElementById('profilepic');
    var dpicon      = document.getElementById('profilepicicon');
    var userEmail   = document.getElementById('profileemail');
    var fname       = document.getElementById('fullname');
    var address     = document.getElementById('address');
    var dob         = document.getElementById('dob');
    var gender      = document.getElementById('gender');
    var nextBtn     = document.getElementById('filloutNextBtn');
    var fnameErr    = document.getElementById('nameMissing');
    var addErr      = document.getElementById('addressError');
    var dobErr      = document.getElementById('dobError');
    var genderErr   = document.getElementById('genderError');
    var profname    = document.getElementById('profilefullname');
    var worker      = document.getElementById('workerBtn');
    var stud        = document.getElementById('studentBtn');
    var sen         = document.getElementById('seniorBtn');
    var pwd         = document.getElementById('pwdBtn');
    var studUpload  = document.getElementById('studentFileBtn');
    var senUpload   = document.getElementById('seniorFileBtn');
    var pwdUpload   = document.getElementById('pwdFileBtn');
    var studSubmit  = document.getElementById('studSubBtn');
    var senSubmit   = document.getElementById('senSubBtn');
    var pwdSubmit   = document.getElementById('pwdSubBtn');
    var studComTxt  = document.getElementById('studComplete');
    var senComTxt   = document.getElementById('senComplete');
    var pwdComTxt   = document.getElementById('pwdComplete');
    var dash        = document.getElementById('dashbtn');
    var seat        = document.getElementById('seatbtn');
    var prof        = document.getElementById('profbtn');
    var pass        = document.getElementById('passbtn');
    var dashdiv     = document.getElementById('dashboard');
    var seatdiv     = document.getElementById('reservation');
    var profdiv     = document.getElementById('account');
    var passdiv     = document.getElementById('password');
    
    dash.addEventListener('click', e=>{
        dashdiv.classList.remove('hide');
        seatdiv.classList.add('hide');
        profdiv.classList.add('hide');
        passdiv.classList.add('hide');
    });

    seat.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        seatdiv.classList.remove('hide');
        profdiv.classList.add('hide');
        passdiv.classList.add('hide');
    });

    prof.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        seatdiv.classList.add('hide');
        profdiv.classList.remove('hide');
        passdiv.classList.add('hide');
    });

    pass.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        seatdiv.classList.add('hide');
        profdiv.classList.add('hide');
        passdiv.classList.remove('hide');
    });

    logout.addEventListener('click', e=>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    });

    nextBtn.addEventListener('click', e=>{
        if(fname.value == "" && address.value == "" && dob.value == "" && gender.value == ""){
            fnameErr.classList.remove('hide');
            addErr.classList.remove('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value != "" && address.value == "" && dob.value == "" && gender.value == ""){
            fnameErr.classList.add('hide');
            addErr.classList.remove('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value != "" && address.value != "" && dob.value == "" && gender.value == ""){
            fnameErr.classList.add('hide');
            addErr.classList.add('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value != "" && address.value != "" && dob.value != "" && gender.value == ""){
            fnameErr.classList.add('hide');
            addErr.classList.add('hide');
            dobErr.classList.add('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value == "" && address.value == "" && dob.value == "" && gender.value != ""){
            fnameErr.classList.remove('hide');
            addErr.classList.remove('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.add('hide');
        }else if(fname.value == "" && address.value == "" && dob.value != "" && gender.value != ""){
            fnameErr.classList.remove('hide');
            addErr.classList.remove('hide');
            dobErr.classList.add('hide');
            genderErr.classList.add('hide');
        }else if(fname.value == "" && address.value != "" && dob.value != "" && gender.value != ""){
            fnameErr.classList.remove('hide');
            addErr.classList.add('hide');
            dobErr.classList.add('hide');
            genderErr.classList.add('hide');
        }else if(fname.value == "" && address.value == "" && dob.value != "" && gender.value != ""){
            fnameErr.classList.remove('hide');
            addErr.classList.remove('hide');
            dobErr.classList.add('hide');
            genderErr.classList.add('hide');
        }else if(fname.value != "" && address.value != "" && dob.value == "" && gender.value == ""){
            fnameErr.classList.add('hide');
            addErr.classList.add('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value != "" && address.value == "" && dob.value != "" && gender.value == ""){
            fnameErr.classList.add('hide');
            addErr.classList.remove('hide');
            dobErr.classList.add('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value == "" && address.value != "" && dob.value == "" && gender.value != ""){
            fnameErr.classList.remove('hide');
            addErr.classList.add('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.add('hide');
        }else if(fname.value != "" && address.value == "" && dob.value == "" && gender.value != ""){
            fnameErr.classList.add('hide');
            addErr.classList.remove('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.add('hide');
        }else if(fname.value == "" && address.value != "" && dob.value != "" && gender.value == ""){
            fnameErr.classList.remove('hide');
            addErr.classList.add('hide');
            dobErr.classList.add('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value == "" && address.value != "" && dob.value == "" && gender.value == ""){
            fnameErr.classList.remove('hide');
            addErr.classList.add('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value == "" && address.value == "" && dob.value != "" && gender.value == ""){
            fnameErr.classList.remove('hide');
            addErr.classList.remove('hide');
            dobErr.classList.add('hide');
            genderErr.classList.remove('hide');
        }else if(fname.value != "" && address.value != "" && dob.value == "" && gender.value != ""){
            fnameErr.classList.add('hide');
            addErr.classList.add('hide');
            dobErr.classList.remove('hide');
            genderErr.classList.add('hide');
        }else if(fname.value != "" && address.value == "" && dob.value != "" && gender.value != ""){
            fnameErr.classList.add('hide');
            addErr.classList.remove('hide');
            dobErr.classList.add('hide');
            genderErr.classList.add('hide');
        }else{
            db.collection('passengers').doc(uid).set({
                id: uid,
                fullname: fname.value,
                location: address.value,
                birthday: dob.value,
                sex: gender.value,
                photo: null
            }).then(function(){
                $(document).ready(function(){
                    $('#profileModal').modal('close');
                    $('#occupationModal').modal('open');
                });
            });
        }
    });

    worker.addEventListener('click', e=>{
        db.collection('passengers').doc(uid).update({
            occupation: "Worker"
        }).then(function(){
            $(document).ready(function(){
                $('#occupationModal').modal('close');
            });
        });
    });

    stud.addEventListener('click', e=>{
        db.collection('passengers').doc(uid).update({
            occupation: "Student",
            validated: false
        }).then(function(){
            $(document).ready(function(){
                $('#occupationModal').modal('close');
                $('#studentModal').modal('open');
            });
        });
    });

    sen.addEventListener('click', e=>{
        db.collection('passengers').doc(uid).update({
            occupation: "Senior Citizen",
            validated: false
        }).then(function(){
            $(document).ready(function(){
                $('#occupationModal').modal('close');
                $('#seniorModal').modal('open');
            });
        });
    });

    pwd.addEventListener('click', e=>{
        db.collection('passengers').doc(uid).update({
            occupation: "Person With Disability",
            validated: false
        }).then(function(){
            $(document).ready(function(){
                $('#occupationModal').modal('close');
                $('#pwdModal').modal('open');
            });
        });
    });

    studUpload.addEventListener('change', function(e){
        studUpload.classList.add('hide');
        var file = e.target.files[0];
        //Create Storage Ref
        var storageRef = firebase.storage().ref('IDs/' + file.name);
        //Upload file
        var task = storageRef.put(file);
        //Update progress bar
        task.on('state_changed', 
        function progress(snapshot){
            var percentage          = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            studentUploader.value   = percentage;
        },
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('passengers').doc(uid).update({
                    identification: downloadURL
                }).then(function(){
                    studSubmit.disabled = false;
                    studComTxt.classList.remove('hide');
                });
            });
        });
    });

    studSubmit.addEventListener('click', e=>{
        $(document).ready(function(){
            $('#successModal').modal('open');
            $('#studentModal').modal('close');
        });
    });

    senUpload.addEventListener('change', function(e){
        senUpload.classList.add('hide');
        var file        = e.target.files[0];
        //Create Storage Ref
        var storageRef  = firebase.storage().ref('IDs/' + file.name);
        //Upload file
        var task        = storageRef.put(file);
        //Update progress bar
        task.on('state_changed', 
        function progress(snapshot){
            var percentage          = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            seniorUploader.value    = percentage;
        },
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('passengers').doc(uid).update({
                    identification: downloadURL
                }).then(function(){
                    senSubmit.disabled = false;
                    senComTxt.classList.remove('hide');
                });
            });
        });
    });

    senSubmit.addEventListener('click', e=>{
        $(document).ready(function(){
            $('#successModal').modal('open');
            $('#seniorModal').modal('close');
        });
    });

    pwdUpload.addEventListener('change', function(e){
        pwdUpload.classList.add('hide');
        var file        = e.target.files[0];
        //Create Storage Ref
        var storageRef  = firebase.storage().ref('IDs/' + file.name);
        //Upload file
        var task        = storageRef.put(file);
        //Update progress bar
        task.on('state_changed', 
        function progress(snapshot){
            var percentage          = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            pwdUploader.value       = percentage;
        },
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('passengers').doc(uid).update({
                    identification: downloadURL
                }).then(function(){
                    pwdSubmit.disabled = false;
                    pwdComTxt.classList.remove('hide');
                });
            });
        });
    });

    pwdSubmit.addEventListener('click', e=>{
        $(document).ready(function(){
            $('#successModal').modal('open');
            $('#pwdModal').modal('close');
        });
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            console.log(uid);
            console.log(user.emailVerified);
            userEmail.textContent = user.email;

            if(user.emailVerified == false){
                $(document).ready(function(){
                    $('#verifyEmailModal').modal('open');
                    $('#profileModal').modal('close');
                });
                user.sendEmailVerification().then(function() {
                    // Email sent.
                }).catch(function(error) {
                    // An error happened.
                });
            }else{
                $(document).ready(function(){
                    $('#verifyEmailModal').modal('close');
                });
                db.collection('passengers').doc(uid).onSnapshot(function(doc){
                    if(doc.exists){
                        dpicon.classList.add('hide');
                        profname.textContent = doc.data().fullname;
                        if(doc.data().photo == null){
                            dpicon.classList.remove('hide');
                            dp.classList.add('hide');
                        }else{
                            dpicon.classList.add('hide');
                            dp.classList.remove('hide');
                            dp.src = doc.data().photo;
                        }
                        dpicon.textContent = 'account_circle';
                        $(document).ready(function(){
                            $('#profileModal').modal('close');
                        });
                    }else{
                        $(document).ready(function(){
                            $('#profileModal').modal('open');
                        });
                        dpicon.classList.remove('hide');
                        dpicon.textContent = 'account_circle';
                    }
                });
            }
        } else {
            window.location = '/index.html';
        }
    });
})();