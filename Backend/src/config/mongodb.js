import mongoose from "mongoose";


const connetDB = async () =>{

    mongoose.connection.on('connected',() =>{
        console.log("connetion established")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connetDB;