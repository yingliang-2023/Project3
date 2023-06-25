const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET='secret';

exports.createUser =(req, res) => {


  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,5),
    });

  //save a item in the mongodb
  user
    .save()
    .then((data) => {
      res.status(200).json({data});
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};


exports.authenticate = async(req,res) => {
  const {username, password} = req.body;
 
  var user= await User.find({username:req.body.username});
 

  if (!user) {
    //  return res.json({error:"user not found!"})
    alert("User not found");
    };
   
    console.log(user[0]);
   var user=user[0];

   if( await bcrypt.compare(password,user.password)){
    console.log('password matches');
      const token=jwt.sign({},JWT_SECRET);
      if(res.status(201)){
        return res.json({status:'ok', data:token});
      }else{
    return res.json({status:"error"});
      }
  }
  res.json({status:"error",error:"Invalid password"});
};

exports.getUserData = async(req,res) =>{
  const {token} = req.body;
  try{
    const user = jwt.verity(token,JWT_SECRET);
    const username = user.username;
    User.find({username:username})[0].then((data) =>{
      res.send({status:'ok', data:data});
    }).catch((error) =>{
      res.send({status:'error', data:data});
    })
  }catch(error){

  }
}

