var express = require("express");
var router = express.Router();

const credential = {
    email : "sample@gmail.com",
    password : "sample123"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password== credential.password) {//database value but here we using const
       req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login successfull");

    }  else {
        if(req.body.email !=credential.email) {
            res.end("User not found");
        } else {
            res.end("password not match");
        }

    }          
});

//router for dashboard
router.get('/dashboard', (req,res)=>{
if(req.session.user){
    res.render('dashboard',{user: req.session.user})
}else{
    res.send("Unauthorized User");
}

})

//route for logout

router.get('/logout',(req,res)=>{
   req.session.destroy(function(err){
if(err){
    console.log(err);
    res.send("Error");
} else {
    res.render('base',{title:"Express",logout:"logout Successfull"})
}

   })
   

})


module.exports = router; //to export all modules