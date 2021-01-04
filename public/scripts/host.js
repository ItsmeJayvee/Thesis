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
        $('.collapsible').collapsible();
        $('.modal').modal({
            dismissible: false
        });
        $('.datepicker').datepicker({
            format: 'm/d/yyyy'
        });
        $('.timepicker').timepicker();
        $('.tabs').tabs();
        $('select').formSelect();
    });

    var uid;
    var db                  = firebase.firestore();
    var logout              = document.getElementById('logoutBtn');
    var next                = document.getElementById('nextbtn');
    var company             = document.getElementById('businessname');
    var address             = document.getElementById('businessaddress');
    var compmiss            = document.getElementById('compnamemiss');
    var addmiss             = document.getElementById('compaddmiss');
    var filebtn             = document.getElementById('filebtn');
    var logout2             = document.getElementById('logoutBtn2');
    var dashdiv             = document.getElementById('dashboard');
    var resdiv              = document.getElementById('reservations');
    var adduserdiv          = document.getElementById('addUser');
    var manageuserdiv       = document.getElementById('manageuser');
    var addbusdiv           = document.getElementById('addbus');
    var editbusdiv          = document.getElementById('editbus');
    var profdiv             = document.getElementById('profile');
    var resetdiv            = document.getElementById('resetpass');
    var paymentdiv          = document.getElementById('payment');
    var dashbtn             = document.getElementById('dashbtn');
    var seatbtn             = document.getElementById('seatbtn');
    var adduserbtn          = document.getElementById('adduserbtn');
    var manageuserbtn       = document.getElementById('managebtn');
    var addbusbtn           = document.getElementById('addbusbtn');
    var editbusbtn          = document.getElementById('editbusbtn');
    var profbtn             = document.getElementById('profbtn');
    var passbtn             = document.getElementById('passbtn');
    var from                = document.getElementById('from');
    var to                  = document.getElementById('to');
    var busnum              = document.getElementById('busnumber');
    var busplate            = document.getElementById('busplate');
    var busdep              = document.getElementById('busdeparture');
    var seatcap             = document.getElementById('seatcap');
    var regbusbtn           = document.getElementById('regbus');
    var printActiveBus      = document.querySelector('#activeBus');
    var printInactiveBus    = document.querySelector('#inactiveBus');
    var editfrom            = document.getElementById('editfrom');
    var editto              = document.getElementById('editto');
    var editbusnumber       = document.getElementById('editbusnumber');
    var editbusplate        = document.getElementById('editbusplate');
    var editbusdeparture    = document.getElementById('editbusdeparture');
    var editseatcap         = document.getElementById('editseatcap');
    var editdriver          = document.getElementById('editdriver');
    var edithelper          = document.getElementById('edithelper');
    var closViewBusInfo     = document.getElementById('closeViewBusModal');

    var cd = new Date();
    var cMonth = parseInt(cd.getMonth() + 1);
    var cDate = cd.getDate();
    var cYear = cd.getFullYear();
    currentDate.textContent = 'Date: '+cMonth+'/'+cDate+'/'+cYear;

    dashbtn.addEventListener('click', e=>{
        dashdiv.classList.remove('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    seatbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.remove('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    adduserbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.remove('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    manageuserbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.remove('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    addbusbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.remove('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    editbusbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.remove('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    profbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.remove('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.add('hide');
    });
    passbtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.remove('hide');
        paymentdiv.classList.add('hide');
    });
    payBtn.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        resdiv.classList.add('hide');
        adduserdiv.classList.add('hide');
        manageuserdiv.classList.add('hide');
        addbusdiv.classList.add('hide');
        editbusdiv.classList.add('hide');
        profdiv.classList.add('hide');
        resetdiv.classList.add('hide');
        paymentdiv.classList.remove('hide');
    });

    function renderActiveBuses(doc){
        let tr          = document.createElement('tr');
        let td1         = document.createElement('td');
        let td2         = document.createElement('td');
        let td3         = document.createElement('td');
        let viewBtn     = document.createElement('button');

        tr.setAttribute('data-id', doc.id);
        td1.textContent = doc.data().busPlate;
        td2.textContent = doc.data().busNumber;
        viewBtn.setAttribute('class', 'waves-effect waves-dark btn blue');
        viewBtn.textContent = 'View';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(viewBtn);
        printActiveBus.appendChild(tr);

        viewBtn.addEventListener('click', e=>{
            db.collection('bus').doc(doc.id).get().then(function(doc){
                editfrom.value          = doc.data().routeFrom;
                editto.value            = doc.data().routeTo;
                editbusnumber.value     = doc.data().busNumber;
                editbusplate.value      = doc.data().busPlate;
                editbusdeparture.value  = doc.data().busDepartureTime;
                editseatcap.value       = doc.data().seatCapacity;
                editdriver.value        = doc.data().busDriver;
                edithelper.value        = doc.data().busHelper;
            });
            $(document).ready(function(){
                $('#viewBusModal').modal('open');
            });
        });
    }

    function renderInactiveBuses(doc){
        let tr          = document.createElement('tr');
        let td1         = document.createElement('td');
        let td2         = document.createElement('td');
        let td3         = document.createElement('td');
        let viewBtn     = document.createElement('button');

        tr.setAttribute('data-id', doc.id);
        td1.textContent = doc.data().busPlate;
        td2.textContent = doc.data().busNumber;
        viewBtn.setAttribute('class', 'waves-effect waves-dark btn blue');
        viewBtn.textContent = 'View';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(viewBtn);
        printInactiveBus.appendChild(tr);

        viewBtn.addEventListener('click', e=>{
            db.collection('bus').doc(doc.id).get().then(function(doc){
                editfrom.value          = doc.data().routeFrom;
                editto.value            = doc.data().routeTo;
                editbusnumber.value     = doc.data().busNumber;
                editbusplate.value      = doc.data().busPlate;
                editbusdeparture.value  = doc.data().busDepartureTime;
                editseatcap.value       = doc.data().seatCapacity;
                editdriver.value        = doc.data().busDriver;
                edithelper.value        = doc.data().busHelper;
            });
            $(document).ready(function(){
                $('#viewBusModal').modal('open');
            });
        });
    }

    closViewBusInfo.addEventListener('click', e=>{
        editfrom.value = "";
        editto.value = "";
        editbusnumber.value = "";
        editbusplate.value = "";
        editbusdeparture.value = "";
        editseatcap.value = "";
        editdriver.value = "";
        edithelper.value = "";
        $(document).ready(function(){
            $('#viewBusModal').modal('close');
        });
    });

    regbusbtn.addEventListener('click', e=>{
        if(from.value == ""){
            document.getElementById('errorfrm').classList.remove('hide')
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(to.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.remove('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(busnum.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.remove('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(busplate.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.remove('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(busdep.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.remove('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(seatcap.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.remove('hide');
            document.getElementById('errorfare').classList.add('hide');
        }else if(fare.value == ""){
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.remove('hide');
        }else{
            document.getElementById('errorfrm').classList.add('hide');
            document.getElementById('errorto').classList.add('hide');
            document.getElementById('errorbusnum').classList.add('hide');
            document.getElementById('errorbusplate').classList.add('hide');
            document.getElementById('errordeparture').classList.add('hide');
            document.getElementById('errorseat').classList.add('hide');
            document.getElementById('errorfare').classList.add('hide');

            db.collection('buscompany').doc(uid).get().then(function(doc){
                db.collection('bus').add({
                    companyId: uid,
                    routeFrom: from.value,
                    routeTo: to.value,
                    busNumber: busnum.value,
                    busPlate: busplate.value,
                    busDepartureTime: busdep.value,
                    seatCapacity: seatcap.value,
                    busCompany: doc.data().company,
                    fare: fare.value,
                    active: true
                }).then(function(){
                    from.value = "";
                    to.value = "";
                    busnum.value = "";
                    busplate.value = "";
                    busdep.value = "";
                    seatcap.value = "";
                    fare.value = "";
                    $(document).ready(function(){
                        $('#addBusModal').modal('open');
                    });
                });
            });
        }
    });

    next.addEventListener('click', e=>{
        if(company.value == "" && address.value == ""){
            compmiss.classList.remove('hide');
            addmiss.classList.remove('hide');
        }else if(company.value != "" && address.value == ""){
            compmiss.classList.add('hide');
            addmiss.classList.remove('hide');
        }else if(company.value == "" && address.value != ""){
            compmiss.classList.remove('hide');
            addmiss.classList.add('hide');
        }else{
            compmiss.classList.add('hide');
            addmiss.classList.add('hide');

            db.collection('buscompany').doc(uid).update({
                company: company.value,
                address: address.value
            }).then(function(){
                $(document).ready(function(){
                    $('#hostProfileModal').modal('close');
                    $('#documentModal').modal('open');
                });
            });
        }
    });

    filebtn.addEventListener('change', e=>{
        filebtn.classList.add('hide');

        var file = e.target.files[0];
        //Create Storage Ref
        var storageRef = firebase.storage().ref('businessPermit/' + file.name);
        //Upload file
        var task = storageRef.put(file);
        //Update progress bar
        task.on('state_changed', 
        function progress(snapshot){
            var percentage      = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value        = percentage;
        },
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('buscompany').doc(uid).update({
                    businessPermit: downloadURL
                }).then(function(){
                    $(document).ready(function(){
                        $('#documentModal').modal('close');
                        $('#stripeModal').modal('open');
                    });
                })
            });
        });
    });

    updatephotobtn.addEventListener('click', e=>{
        uploaderDiv.classList.remove('hide');
        updatephotobtn.classList.add('hide');
    });

    photofilebtn.addEventListener('change', e=>{
        photofilebtn.classList.add('hide');

        var file = e.target.files[0];
        //Create Storage Ref
        var storageRef = firebase.storage().ref('busCompProfPhoto/' + file.name);
        //Upload file
        var task = storageRef.put(file);
        //Update progress bar
        task.on('state_changed', 
        function progress(snapshot){
            var percentage          = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            photouploader.value     = percentage;
        },
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                db.collection('buscompany').doc(uid).update({
                    photo: downloadURL
                }).then(function(){
                    uploaderDiv.classList.add('hide');
                    updatephotobtn.classList.remove('hide');
                    photofilebtn.classList.remove('hide');
                    photouploader.value = 0;
                    photofilebtn.value = "";
                });
            });
        });
    });

    logout.addEventListener('click', e=>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    });
    
    logout2.addEventListener('click', e=>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    });

    updateProfBtn.addEventListener('click', e=>{
        db.collection('buscompany').doc(uid).update({
            company: compname.value,
            address: compadd.value,
        }).then(function(){
            $(document).ready(function(){
                $('#updateModal').modal('open');
            });
        });
    });

    conNewPass.addEventListener('keyup', e=>{
        if(newPass.value != conNewPass.value){
            changepassmatchErr1.classList.remove('hide');
            changepassmatchErr2.classList.remove('hide');
            changePassesBtn.disabled = true;
        }else{
            changepassmatchErr1.classList.add('hide');
            changepassmatchErr2.classList.add('hide');
            changePassesBtn.disabled = false;
        }
    });

    changePassesBtn.addEventListener('click', e=>{
        db.collection('buscompany').doc(uid).get().then(function(doc){
            if(doc.data().currentPassword == currentPass.value){
                currentPassError.classList.add('hide');
                var user = firebase.auth().currentUser;
                var newPassword = newPass.value;
                cpErrorHide.classList.add('hide');
                user.updatePassword(newPassword).then(function() {
                    $(document).ready(function(){
                        $('#updatePasswordModal').modal('open');
                    });
                    newPass.value = "";
                    conNewPass.value = "";
                }).catch(function(error) {
                    cpErrorHide.classList.remove('hide');
                    printChangePassError.textContent = error.message;
                });
            }else{
                currentPassError.classList.remove('hide');
            }
        });
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            profileemail.textContent = user.email;
            if(user.emailVerified == false)
            {
                $(document).ready(function(){
                    $('#verifyEmailModal').modal('open');
                });
                user.sendEmailVerification().then(function() {
                    // Email sent.
                }).catch(function(error) {
                    // An error happened.
                });
            }else{
                db.collection('buscompany').doc(uid).onSnapshot(function(doc){
                    if(doc.data().company != null && doc.data().address != null){
                        $(document).ready(function(){
                            $('#hostProfileModal').modal('close');
                        });
                        profilefullname.textContent = doc.data().company;
                        compname.value = doc.data().company;
                        compadd.value = doc.data().address;
                    }else{
                        $(document).ready(function(){
                            $('#hostProfileModal').modal('open');
                        });
                    }
                    if(doc.data().photo == null){
                        profilepicicon.textContent = "business_center";
                        profilepicicon.classList.remove('hide');
                        profilepic.classList.add('hide');
                        profilePhoto.classList.add('hide');
                        profileIcon.classList.remove('hide');
                    }else{
                        profilepicicon.classList.add('hide');
                        profilepic.src = doc.data().photo;
                        profilepic.classList.remove('hide');
                        profilePhoto.classList.remove('hide');
                        profileIcon.classList.add('hide');
                        profilePhoto.src = doc.data().photo;
                    }
                    if(user.emailVerified == true && doc.data().company != null && doc.data().address != null && doc.data().businessPermit != null && doc.data().validated == false){
                        $(document).ready(function(){
                            $('#validateModal').modal('open');
                        });
                    }
                });
                db.collection('bus').where('companyId', '==', uid).where('active', '==', true).onSnapshot(snapshot=>{
                    snapshot.docChanges().forEach(change=>{
                        if(change.type === 'added'){
                            renderActiveBuses(change.doc);
                        }
                    });
                });
                db.collection('bus').where('companyId', '==', uid).where('active', '==', false).onSnapshot(snapshot=>{
                    snapshot.docChanges().forEach(change=>{
                        if(change.type === 'added'){
                            renderInactiveBuses(change.doc)
                        }
                    });
                });
                compeadd.value = user.email;
            }
            stripeNextBtn.addEventListener('click', e=>{
                db.collection('stripeRequest').doc(uid).set({
                    firstname: stripefirstname.value,
                    lastname: stripelastname.value,
                    dob: stripedob.value,
                    phone: stripephone.value,
                    address: stripeaddress.value,
                    status: 'pending'
                }).then(function(){
                    $(document).ready(function(){
                        $('#stripeModal').modal('close');
                        $('#stripeModal2').modal('open');
                    });
                });
            });

            frontBtn.addEventListener('change', e=>{
                frontBtn.classList.add('hide');
                var file = e.target.files[0];
                //Create Storage Ref
                var storageRef = firebase.storage().ref('stripe/' + file.name);
                //Upload file
                var task = storageRef.put(file);
                //Update progress bar
                task.on('state_changed', 
                function progress(snapshot){
                    var percentage           = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    frontUploader.value      = percentage;
                },
                function error(err){

                },
                function complete(){
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        db.collection('stripeRequest').doc(uid).update({
                            frontIdentity: downloadURL
                        }).then(function(){
                            if(backBtn.value == ""){

                            }else{
                                stripeSubmitBtn.disabled = false;
                            }
                        });
                    });
                });
            });
            backBtn.addEventListener('change', e=>{
                backBtn.classList.add('hide');
                var file = e.target.files[0];
                //Create Storage Ref
                var storageRef = firebase.storage().ref('stripe/' + file.name);
                //Upload file
                var task = storageRef.put(file);
                //Update progress bar
                task.on('state_changed', 
                function progress(snapshot){
                    var percentage          = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    backUploader.value      = percentage;
                },
                function error(err){

                },
                function complete(){
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        db.collection('stripeRequest').doc(uid).update({
                            backIdentity: downloadURL
                        }).then(function(){
                            if(frontBtn.value == ""){

                            }else{
                                stripeSubmitBtn.disabled = false;
                            }
                        });
                    });
                });
            });

        } else {
            window.location = '/index.html';
        }
    });
})();