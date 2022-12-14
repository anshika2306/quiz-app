import mongoose from "mongoose";
var jwt = require("jsonwebtoken");
import user from "../models/user";

export const authenticateAndConnectDb = handler => async(req, res) => {
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGO_URI)
    }
    if(req.headers.token == null || req.headers.token == undefined){
        return res.status(401).send({
            error: "User not found"
        })
    }else{
        var result = await jwt.verify(req.headers.token, 'jwtsecret')
        req.user = await user.findOne({
            email: result.email
        })
    }
    return handler(req,res);
}
export const adminAuthandConnectDb = handler => async(req, res) => {
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGO_URI)
    }
    if(req.headers.token == null || req.headers.token == undefined){
        return res.status(401).send({
            error: "User not found"
        })
    }else{
        var result = await jwt.verify(req.headers.token, 'jwtsecret')
        let user_ = await user.findOne({
            email: result.email
        })
        if(!user_.admin){
            return res.status(401).send({
                error: "User not admin"
            })
        }
        req.user = user_;
    }
    return handler(req,res);
}

export const connectDb = handler => async (req,res)=>{

    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req,res);
}
