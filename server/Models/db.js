const mongoose = require('mongoose');
   
const mongo_url = "mongodb+srv://sahookumarbijay146:7iJKhs59ilrawBNN@cluster0.fyl5xdv.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0";

console.log("MongoDB URL:", mongo_url);

mongoose.connect(mongo_url)
   .then(()=>{
    console.log("Connected to MongoDB");
  })
  .catch((err)=>{
    console.log("Error connecting to MongoDB",err);
  });









