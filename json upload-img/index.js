const express=require("express")
const cloudinary=require("cloudinary").v2
const fileUpload=require("express-fileupload")
const cors=require("cors")
const bodyParser= require("body-parser")
const app=express()

/* const multipart = require('connect-multiparty');    
const multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });
app.use(multipartMiddleware); */
app.use(cors(

))
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))
app.use(express.json())
app.use(fileUpload({ 
    useTempFiles:true
 }))
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
cloudinary.config({
    cloud_name: "dhknvtaq2",
    api_key: "536311875473995",
    api_secret: "kRp_WUvXGZvIqTizithrdO8VxJA"

})

app.post("/",async (req,res)=>{

        const file=req.files.file
        try {
            // Upload the image
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder:"project",
                resource_type:"auto",
                
            });
                let newResult=result.url.slice(0,49)+`c_pad,h_200,w_300/`+result.url.slice(49)
                res.json({mess:newResult})
          } catch (error) {
            console.error(error);
          }
    
})

app.get("/",async (req,res)=>{
    res.json({
        mess:"hello"
    });
})

app.listen(2020,()=>{
    console.log("Server Running");
})