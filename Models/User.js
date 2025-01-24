const Mongoose=require("mongoose")
const{CreateToken}=require("../utils/utils")
const userSchema=new Mongoose.Schema({
    name:{
        type:String
    },
    message:{
        type:String
    },
    token:{
        type:String
    },
    createat:{
        type:Date,
        default:Date.now
    }
   
},{timestamps:true})
userSchema.post("save",(doc)=>{
    const newtoken=CreateToken(doc.name)
    doc.token=newtoken
    doc.save(); 
})
module.exports=Mongoose.model("User",userSchema)