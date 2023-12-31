if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_Public_KEY;


const express = require('express');
const fs  = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/store", (req, res) => {
    fs.readFile('items.json', (error, data) => {
        if(error){
            res.status(500).end();
        }
        else{
            res.render('store.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            });
        }  
    });
});
app.listen(3000, () => {
    console.log("server is up and running");
})