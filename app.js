const express = require('express');
const stripe = require('stripe')('sk_test_51HpMAsGKEizdInGXqC9Lg2OAYU7paQ4KqYregRSJRYEHK4YQVtursDzR2MYiP6bLOPY6KjLR58Xrhy3Oj9GrlliA00cjAPLCUQ');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const port = process.env.PORT || 5500;

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(`${__dirname}/public`))

app.get('/', (req,res)=>{
    res.getFile('/index.html');
});

app.post('/charge', (req, res)=>{
    const amount = req.body.chargeAmount * 100;
    const accountID = req.body.stripeAccount;
    stripe.charges.create({
        amount,
        currency: 'PLN',
        source: req.body.stripeToken,
    },{
        stripe_account: accountID,
    }).then(charge => res.render('index'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});