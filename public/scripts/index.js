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
    var d = new Date();
    $(document).ready(function(){
        $('select').formSelect();
        $('.parallax').parallax();
        $('.sidenav').sidenav();
        $('.modal').modal({
            dismissible: false
        });
        $('.datepicker').datepicker({
            yearRange: [1950, d.getFullYear()],
            container: 'body'
        });
    });

    var uid;
    var db              = firebase.firestore();
    var login           = document.getElementById('loginBtn');
    var emailaddress    = document.getElementById('email');
    var password        = document.getElementById('password');
    var eError          = document.getElementById('emailError');
    var pError          = document.getElementById('passError');
    var loginErr        = document.getElementById('loginError');
    var register        = document.getElementById('registerBtn');
    var regEmail        = document.getElementById('registerEmail');
    var regPass         = document.getElementById('registerPassword');
    var conPass         = document.getElementById('confirmPassword');
    var regEmailErr     = document.getElementById('regEmailError');
    var regPassErr      = document.getElementById('regPassError');
    var regConPassErr   = document.getElementById('regConPassError');
    var regErr          = document.getElementById('registerError');
    var host1           = document.getElementById('hostbtn1');
    var host2           = document.getElementById('hostbtn2');
    var account1        = document.getElementById('accountbtn1');
    var account2        = document.getElementById('accountbtn2');
    var login1          = document.getElementById('loginbtn1');
    var login2          = document.getElementById('loginbtn2');
    var placeFrom       = document.getElementById('from');
    var placeTo         = document.getElementById('to');
    var bookDate        = document.getElementById('bookDate');
    var printBus        = document.querySelector('#busResults');

    var stripe = Stripe('pk_test_51HpMAsGKEizdInGXxKX1vvybNt9hmWJvKcff8OEA2PaDm0u5WRiNXnbpmP9VHn7q3ZOrCwztMfvMPW0CHm4QiKEl008eUb7M6W');
    var elements = stripe.elements();

    var style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };
      
    var card = elements.create("card", { style: style });
    card.mount("#card-element");

    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');

        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        var hiddenAmount = document.createElement('input');
        hiddenAmount.setAttribute('type', 'hidden');
        hiddenAmount.setAttribute('name', 'chargeAmount');
        hiddenAmount.setAttribute('value', fare2.textContent);
        var hiddenDescription = document.createElement('input');
        hiddenDescription.setAttribute('type', 'hidden');
        hiddenDescription.setAttribute('name', 'chargeDescription');
        hiddenDescription.setAttribute('value', comp2.textContent);
        form.appendChild(hiddenInput);
        form.appendChild(hiddenAmount);
        form.appendChild(hiddenDescription);
    }

    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
    });

    var form = document.getElementById('payment-form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          stripeTokenHandler(result.token);
        }
      });
    });

    function renderBuses(doc){
        let li              = document.createElement('li');
        let divRow          = document.createElement('div');
        let divLeft         = document.createElement('div');
        let divRight        = document.createElement('div');
        let image           = document.createElement('img');
        let ul              = document.createElement('ul');
        let liCompany       = document.createElement('li');
        let liBusPlate      = document.createElement('li');
        let liBusNum        = document.createElement('li');
        let liRoute         = document.createElement('li');
        let liDeparture     = document.createElement('li');
        let liSeats         = document.createElement('li');
        let liFare          = document.createElement('li');
        let liButton        = document.createElement('li');
        let btnDiv          = document.createElement('div');
        let bookBtn         = document.createElement('button');

        li.setAttribute('data-id', doc.id);
        divRow.setAttribute('class', 'row');
        divLeft.setAttribute('class', 'col s12 m6 l6 center-align');
        divRight.setAttribute('class', 'col s12 m6 l6 left-align');
        liCompany.setAttribute('class', 'grey-text text-darken-3');
        liBusPlate.setAttribute('class', 'grey-text text-darken-3');
        liBusNum.setAttribute('class', 'grey-text text-darken-3');
        liRoute.setAttribute('class', 'grey-text text-darken-3');
        liDeparture.setAttribute('class', 'grey-text text-darken-3');
        liSeats.setAttribute('class', 'grey-text text-darken-3');
        liFare.setAttribute('class', 'grey-text text-darken-3');
        btnDiv.setAttribute('class', 'input-field col s12 m12 l12 center-align')
        bookBtn.setAttribute('class', 'waves-effect waves-light blue btn white-text');
        db.collection('buscompany').doc(doc.data().companyId).get().then(function(docs){
            image.src = docs.data().photo
        });
        image.height                = '130';
        image.width                 = '130';
        liCompany.textContent       = "Company: "+doc.data().busCompany;
        liBusPlate.textContent      = "Bus Plate: "+doc.data().busPlate;
        liBusNum.textContent        = "Bus Number: "+doc.data().busNumber;
        liRoute.textContent         = "Departing from: "+doc.data().routeFrom+" & Arriving To: "+doc.data().routeTo;
        liDeparture.textContent     = "Departure time: "+doc.data().busDepartureTime;
        liSeats.textContent         = "Available seats: "+doc.data().seatCapacity;
        liFare.textContent          = "Trave fare amount: "+doc.data().fare;
        bookBtn.textContent         = "Reserve Seat";

        li.appendChild(divRow);
        divRow.appendChild(divLeft);
        divLeft.appendChild(image);
        divRow.appendChild(divRight);
        divRight.appendChild(ul);
        ul.appendChild(liCompany);
        ul.appendChild(liBusPlate);
        ul.appendChild(liBusNum);
        ul.appendChild(liRoute);
        ul.appendChild(liDeparture);
        ul.appendChild(liSeats);
        ul.appendChild(liFare);
        ul.appendChild(liButton);
        liButton.appendChild(btnDiv);
        btnDiv.appendChild(bookBtn);
        printBus.appendChild(li);

        bookBtn.addEventListener('click', e=>{
            var user = firebase.auth().currentUser;
            if (user) {
                db.collection('bus').doc(doc.id).get().then(function(doc){
                    comp.textContent = doc.data().busCompany;
                    departFrom.textContent = doc.data().routeFrom;
                    arriveTo.textContent = doc.data().routeTo;
                    departTime.textContent = doc.data().busDepartureTime;
                    seats.textContent = doc.data().seatCapacity;
                    fare.textContent = doc.data().fare;
                    $(document).ready(function(){
                        $('#bookModal').modal('open');  
                    });
                });
                db.collection('buscompany').doc(doc.data().companyId).get().then(function(doc){
                    comppic.src = doc.data().photo
                });
            } else {
                $(document).ready(function(){
                    $("#loginModal").modal('open');
                });
            }
        });

        checkBtn.addEventListener('click', e=>{
            leftpaymentForm.classList.remove('hide');
            rightpaymentForm.classList.remove('hide');
            hidecheck1.classList.add('hide');
            hidecheck2.classList.add('hide');
            hidecheck3.classList.add('hide');
            var seats = parseInt(numberoftickets.value);
            var amount = parseInt(fare.textContent);
            var total = Number(amount*seats);
            db.collection('bus').doc(doc.id).get().then(function(doc){
                comp2.textContent = doc.data().busCompany;
                departFrom2.textContent = doc.data().routeFrom;
                arriveTo2.textContent = doc.data().routeTo;
                departTime2.textContent = doc.data().busDepartureTime;
                seats2.textContent = seats;
                fare2.textContent = total;
            });
        });
    }

    login.addEventListener('click', e=>{
        if(emailaddress.value == "" && password.value != ""){
            eError.classList.remove('hide');
            pError.classList.add('hide');
        }else if(emailaddress.value != "" && password.value == ""){
            eError.classList.add('hide');
            pError.classList.remove('hide');
        }else if(emailaddress.value == "" && password.value == ""){
            eError.classList.remove('hide');
            pError.classList.remove('hide');
        }else{
            eError.classList.add('hide');
            pError.classList.add('hide');

            var email = emailaddress.value;
            var pass = password.value;
            
            firebase.auth().signInWithEmailAndPassword(email, pass).then(function(){
                $(document).ready(function(){
                    $('#loginModal').modal('close');
                    $('#loadModal').modal('open');
                });
                loginErr.classList.add('hide');
            }).catch(function(error) {
                emailaddress.value = "";
                password.value = "";
                loginErr.classList.remove('hide');
                loginErr.textContent = error.message;
            });
        }
    });
    
    conPass.addEventListener('keyup', e=>{
        if(regPass.value != conPass.value){
            conPass1.classList.remove('hide');
            conPass2.classList.remove('hide');
            register.disabled = true;
        }else{
            conPass1.classList.add('hide');
            conPass2.classList.add('hide');
            register.disabled = false;
        }
    });

    register.addEventListener('click', e=>{
        if(regEmail.value == "" && regPass.value != "" && conPass.value != ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value == "" && regPass.value == "" && conPass.value != ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value == "" && regPass.value != "" && conPass.value == ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value != "" && regPass.value != "" && conPass.value == ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value != "" && regPass.value == "" && conPass.value != ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value != "" && regPass.value == "" && conPass.value == ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value == "" && regPass.value == "" && conPass.value == ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.remove('hide');
        }else{
            regEmailErr.classList.add('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.add('hide');

            var email = regEmail.value;
            var pass = regPass.value;

            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
                $(document).ready(function(){
                    $('#registerModal').modal('close');
                    $('#loadModal').modal('open');
                });
                regErr.classList.add('hide');
            }).catch(function(error) {
                regEmail.value = "";
                regPass.value = "";
                conPass.value = "";
                regErr.classList.remove('hide');
                regErr.textContent = error.message;
            });
        }
    });

    searchBtn.addEventListener('click', e=>{
        if(placeFrom.value == "" && placeTo.value != "" && bookDate.value != ""){
            errFrom.classList.remove('hide');
            errTo.classList.add('hide');
            errDate.classList.add('hide');
        }else if(placeFrom.value != "" && placeTo.value == "" && bookDate.value != ""){
            errFrom.classList.add('hide');
            errTo.classList.remove('hide');
            errDate.classList.add('hide');
        }else if(placeFrom.value == "" && placeTo.value == "" && bookDate.value == ""){
            errFrom.classList.remove('hide');
            errTo.classList.remove('hide');
            errDate.classList.remove('hide');
        }else if(placeFrom.value != "" && placeTo.value != "" && bookDate.value == ""){
            errFrom.classList.add('hide');
            errTo.classList.add('hide');
            errDate.classList.remove('hide');
        }else if(placeFrom.value == "" && placeTo.value == "" && bookDate.value != ""){
            errFrom.classList.remove('hide');
            errTo.classList.remove('hide');
            errDate.classList.add('hide');
        }else if(placeFrom.value != "" && placeTo.value == "" && bookDate.value == ""){
            errFrom.classList.add('hide');
            errTo.classList.remove('hide');
            errDate.classList.remove('hide');
        }else if(placeFrom.value == "" && placeTo.value != "" && bookDate.value == ""){
            errFrom.classList.remove('hide');
            errTo.classList.add('hide');
            errDate.classList.remove('hide');
        }else{
            errFrom.classList.add('hide');
            errTo.classList.add('hide');
            errDate.classList.add('hide');

            db.collection('bus').where('active', '==', true).where('routeFrom', '==', placeFrom.value).where('routeTo', '==', placeTo.value).get().then(snapshot =>{
                if(snapshot.empty){
                    noResult.classList.remove('hide');
                    busResults.innerHTML = "";
                }
                snapshot.docs.forEach(doc=>{
                    noResult.classList.add('hide');
                    renderBuses(doc);
                });
            });
        }
    });

    lessticket.addEventListener('click', e=>{
        if(numberoftickets.value == "1"){
            // do nothing
        }else{
            var intNum = parseInt(numberoftickets.value);
            intNum--;
            numberoftickets.value = intNum;
        }
    });

    addticket.addEventListener('click', e=>{
        console.log(seats.textContent);
        if(numberoftickets.value == parseInt(seats.textContent)){
            // do nothing
        }else{
            var intNum = parseInt(numberoftickets.value);
            intNum++;
            numberoftickets.value = intNum;
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            db.collection('buscompany').doc(uid).get().then(function(doc){
                if(doc.exists){
                    window.location = 'host/index.html';
                }else{
                    if(user.emailVerified == false){
                        window.location = 'users/index.html';
                    }else{
                        host1.classList.add('hide');
                        host2.classList.add('hide');
                        account1.classList.remove('hide');
                        account2.classList.remove('hide');
                        login1.classList.add('hide');
                        login2.classList.add('hide');
                        footbus.classList.add('hide');
                        footprofile.classList.remove('hide');
                        $(document).ready(function(){
                            $('#loadModal').modal('close');
                        });
                    }
                }
            });
        } else {
            //nothing to do
            console.log('no user logged in');
            host1.classList.remove('hide');
            host2.classList.remove('hide');
            account1.classList.add('hide');
            account2.classList.add('hide');
            login1.classList.remove('hide');
            login2.classList.remove('hide');
            footbus.classList.remove('hide');
            footprofile.classList.add('hide');
        }
    });
})();