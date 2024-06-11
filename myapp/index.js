const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express()

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 80;

// Import the customer routes
const customerRoute = require("./route/customers");
const lirarainRoute = require("./route/librarain");
const transactionRoute = require("./route/transactions");
const transactionLineRoute = require("./route/transaction_lines");
const bookRoute = require("./route/books");
const membershipCardRoute = require("./route/membershipCards");

// Use the customers routes
app.use('/api', customerRoute);
app.use('/api', lirarainRoute);
app.use('/api', transactionRoute);
app.use('/api', transactionLineRoute);
app.use('/api', bookRoute);
app.use('/api', membershipCardRoute);

app.get("/test",function(request,response){
    response.send("Hello everyone, Here is NodeJS project.")
})


app.listen(port, () => {
    // console.log("Started application on port http://localhost ");
    console.log("Started application on port http://localhost/ ");
})