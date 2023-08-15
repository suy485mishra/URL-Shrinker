const mongoose=require('mongoose')
const shortId=require('shortid')


//setting up schema
const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,

        //generating short url using shortId librrary
     default:shortId.generate
    },
    clicks:{
        type:Number,
        required:true,
        //starting with 0 always
        default:0
    }
})
//exporting
module.exports=mongoose.model('ShortUrl',shortUrlSchema)