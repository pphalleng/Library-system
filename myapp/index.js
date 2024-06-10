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

// Use the customers routes
app.use('/api', customerRoute);
app.use('/api', lirarainRoute);

app.get("/test",function(request,response){
    response.send("Hello World!")
})


app.listen(port, () => {
    // console.log("Started application on port http://localhost ");
    console.log("Started application on port http://localhost/ ");
})