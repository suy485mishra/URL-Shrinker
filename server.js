const express=require('express')
const mongoose=require('mongoose')
const app=express()
const ShortUrl=require('./model/shortUrl')

//calling mongoose function
mongoose.connect('mongodb://localhost/urlShortener',{
    //parsing after fetching
    useNewUrlParser:true,useUnifiedTopology:true
})
app.set('view engine','ejs')


//tellling app that we r using URL parametres
app.use(express.urlencoded({
    extended:false
}))

app.get('/',async (req,res)=>{
    //to show up the url after button clicked
const shortUrls= await ShortUrl.find()


res.render('index',{
    shortUrls:shortUrls})
})
app.post('/shortUrls',async(req,res)=>{
    //async action hence await
   await ShortUrl.create({full:req.body.fullUrl})
res.redirect('/')
})



//for same link as previous=>bottom of all toher routes
app.get('/:shortUrl',async(req,res)=>{
  const shortUrl=await  ShortUrl.findOne({short:req.params.shortUrl})

  //authentiaction
  if(!shortUrl)return res.sendStatus(404)

  shortUrl.clicks++;
  shortUrl.save()

  res.redirect(shortUrl.full)
})




app.listen(process.env.PORT || 5000);