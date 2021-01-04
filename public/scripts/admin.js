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
        $('.tabs').tabs();
        $('.modal').modal({
            dismissible: false
        });
    });

    var db          = firebase.firestore();
    var logout      = document.getElementById('logoutBtn');
    var dash        = document.getElementById('dashbtn');
    var bus         = document.getElementById('busbtn');
    var verify      = document.getElementById('verifybtn');
    var dashdiv     = document.getElementById('dashboard');
    var busdiv      = document.getElementById('subscribers');
    var verifydiv   = document.getElementById('verifications');
    var busvalue    = document.getElementById('busval');
    var idvalue     = document.getElementById('idval');
    var verifyText  = document.getElementById('verifybadge');
    var printBps    = document.querySelector('#printbp');
    var rejectBtn   = document.getElementById('confirmRejBtn');
    var activeBusC  = document.querySelector('#activeBusComps');
    var inactiveBusC = document.querySelector('#inactiveBusComps');
    
    function renderBusinessPermits(doc)
    {
        let tr          = document.createElement('tr');
        let tdDate      = document.createElement('td');
        let tdComp      = document.createElement('td');
        let tdBtns      = document.createElement('td');
        let tdDoc       = document.createElement('td');
        let docLink     = document.createElement('a');
        let docIcon     = document.createElement('i');
        let btnDiv      = document.createElement('div');
        let leftDiv     = document.createElement('div');
        let rightDiv    = document.createElement('div');
        let acceptBtn   = document.createElement('a');
        let delBtn      = document.createElement('a');

        tr.setAttribute('data-id', doc.id);
        btnDiv.setAttribute('class', 'row');
        leftDiv.setAttribute('class', 'col s6 m6 l6 center-align');
        rightDiv.setAttribute('class', 'col s6 m6 l6 center-align');
        acceptBtn.setAttribute('class', 'btn waves-effect waves-light blue white-text');
        docIcon.setAttribute('class', 'material-icons');
        delBtn.setAttribute('class', 'btn waves-effect waves-light red white-text');
        tdDate.textContent      = doc.data().dateRegistered;
        tdComp.textContent      = doc.data().company;
        docLink.target          = '_blank';
        docLink.href            = doc.data().businessPermit;
        docIcon.textContent     = 'insert_photo';
        acceptBtn.textContent   = 'Accept';
        delBtn.textContent      = 'Reject';

        tr.appendChild(tdDate);
        tr.appendChild(tdComp);
        tr.appendChild(tdDoc);
        tdDoc.appendChild(docLink);
        docLink.appendChild(docIcon);
        tr.appendChild(tdBtns);
        tdBtns.appendChild(btnDiv);
        btnDiv.appendChild(leftDiv);
        leftDiv.appendChild(acceptBtn);
        btnDiv.appendChild(rightDiv);
        rightDiv.appendChild(delBtn)
        printBps.appendChild(tr);

        acceptBtn.addEventListener('click', e=>{
            db.collection('buscompany').doc(doc.id).update({
                validated: true
            }).then(function(){
                $(document).ready(function(){
                    $('#busAccepted').modal('open');
                });
                printBps.removeChild(tr);
            });
        });

        delBtn.addEventListener('click', e=>{
            $(document).ready(function(){
                $('#busRejected').modal('open');
            });
        });

        rejectBtn.addEventListener('click', e=>{
            db.collection('buscompany').doc(doc.id).update({
                validated: 'rejected'
            }).then(function(){
                $(document).ready(function(){
                    $('#busRejected').modal('close');
                });
                printBps.removeChild(tr);
            });
        });
    }

    function renderActiveBusCompanies(doc)
    {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td3Btn = document.createElement('button');

        tr.setAttribute('data-id', doc.id);
        td1.textContent = doc.data().dateRegistered;
        td2.textContent = doc.data().company;
        td3Btn.setAttribute('class', 'btn waves-effect waves-light blue');
        td3Btn.textContent = 'View';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(td3Btn);
        activeBusC.appendChild(tr);
    }

    function renderInactiveBusCompanies(doc)
    {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td3Btn = document.createElement('button');

        tr.setAttribute('data-id', doc.id);
        td1.textContent = doc.data().dateRegistered;
        td2.textContent = doc.data().company;
        td3Btn.setAttribute('class', 'btn waves-effect waves-light blue');
        td3Btn.textContent = 'View';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(td3Btn);
        inactiveBusC.appendChild(tr);
    }

    dash.addEventListener('click', e=>{
        dashdiv.classList.remove('hide');
        busdiv.classList.add('hide');
        verifydiv.classList.add('hide');
    });

    bus.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        busdiv.classList.remove('hide');
        verifydiv.classList.add('hide');
    });

    verify.addEventListener('click', e=>{
        dashdiv.classList.add('hide');
        busdiv.classList.add('hide');
        verifydiv.classList.remove('hide');
    });

    logout.addEventListener('click', e=>{
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection('buscompany').where('validated', '==', false).onSnapshot(snapshot =>{
                var bp = snapshot.size;
                busvalue.textContent = bp
                snapshot.docChanges().forEach(change =>{
                    if(change.type === 'added'){
                        renderBusinessPermits(change.doc);
                    }
                });
                db.collection('passengers').where('validated', '==', false).onSnapshot(snapshot =>{
                    var id = snapshot.size;
                    idvalue.textContent = id;
                    verifyText.textContent = Number(bp + id);
                });
            });
            db.collection('buscompany').where('validated', '==', true).onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change=>{
                    if(change.type === 'added'){
                        renderActiveBusCompanies(change.doc)
                    }
                });
            });
            db.collection('buscompany').where('validated', '==', 'rejected').onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change=>{
                    if(change.type === 'added'){
                        renderInactiveBusCompanies(change.doc)
                    }
                });
            });
        } else {
            window.location = 'index.html';
        }
    });
})();