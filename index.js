// App

const express = require("express");
const app = express();

// Dotenv
const dotenv = require("dotenv");
dotenv.config();

// Cors

const cors = require ('cors');
app.use(cors());

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB

const mongoose = require("mongoose");
const PORT = process.env.PORT || 5050;
const CONNECTION_URI = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URI, {useNewUrlParser:true,
useUnifiedTopology: true}).then(()=> {
    console.log(`mongoDb connected`);
}).catch((err)=>{
    console.log(err);
    console.log(`Some issue in connecting database connected`);
});

app.listen(PORT, ()=> {
    console.log(`Server started at ${PORT}`);
})