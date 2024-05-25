import Joi from "joi";

const registerEmailMiddleware = {
    isEmail:(req,res,next)=>{
        const {useremail} = req.body;
        if(!useremail)
            return res.status(404).json({status:false,message:"useremail is required"})
        next()
    },
    isCorrectFormat:(req,res,next)=>{
        const schema = Joi.object({
            useremail: Joi.string().email({minDomainSegments:1,tlds:{allow:['com']}})
        })

        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error)
                return res.status(406).json({status:false,message:"invalid email"})
        next()
    }
}

export default registerEmailMiddleware;