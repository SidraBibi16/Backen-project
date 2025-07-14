const User=require("./model/user");
const bcrypt=require("bcrypt");
const moment=require("moment");
async function signup(req,res){
  console.log("Body =>", req.body);
console.log("Files =>", req.files);

    try {
      const{
        username,
      email,
      password,
      phone,
      gender,
      dob,
    } = req.body;
      const age=  moment().diff(moment(dob),"years");
      if(age<15){
return res.status(400).json({message:"you must be at least 15 years old"})
      }
      const exsistinguser= await User.findOne({$or:[{email},{phone}]})
      if(exsistinguser){
        return res.status(400).json({message:"Email or phone already exist"});
      }
      const hashedPassword=await bcrypt.hash(password,10);
         const profile = req.files?.profile?.[0]?.filename || null;
    const cover = req.files?.cover?.[0]?.filename || null;
     const user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      profile,
      cover,
    });
      await user.save() ;
      res.status(201).json({message:"Signup successfully"}) 
    }
       catch (error) {
       console.log("Signup failed:",error.message) 
       res.status(500).json({message:"Internal server error"})
    }

}
module.exports=signup;
