const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require('ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // this line code helps to serve public folder as serving folder from which browser will access css and javascript file ----- mainly for browser
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.post("/", function(req,res){
   let interestType = req.body.interestType ;
   let principalAmount = Number(req.body.principal);
   let interestRate = Number(req.body.interestRate);
   let timeInYear = Number(req.body.time);

   if(interestType === "simpleInterest") {
     let simpleInterest = principalAmount*interestRate*timeInYear /100 ;
     res.render("result", {
      interestType : interestType,
      principal : principalAmount,
      interestRate : interestRate,
      time : timeInYear ,
      result : simpleInterest
     });
   }else {
    let compoundInterest = principalAmount*(Math.pow((1+(interestRate/100)), timeInYear)) - principalAmount ;
     res.render("result", {
      interestType : interestType,
      principal : principalAmount,
      interestRate : interestRate,
      time : timeInYear ,
      result : compoundInterest
     });
   }

   
   
});









app.listen(3000, function(){
    console.log("Hello server started on 3000 ports");
});