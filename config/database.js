const monogoose=require("mongoose")
require("dotenv").config()
exports. dbconnect=()=>{
    monogoose.connect(process.env.MONOG_URI).then(()=>{
        console.log("database connection successfull")
    }).catch((err)=>{
        console.log(err)
    })
}

