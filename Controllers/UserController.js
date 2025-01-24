const User=require("../Models/User")
const { successResponse, errorResponse } = require("../utils/utils")

exports. CreatePerson=async(req,res)=>{
    try {
        const {name,message}=req.body
        const person=await User.create({name:name,message:message})
        return successResponse(res,"User Created Successfully",person)

    } catch (error) {
        console.log(error)
        return errorResponse(res,"erro in Creating User",error)
        
    }
}