const multer = require("multer");

const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
    })

    const filefilter=(req,file,cb)=>{
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if(allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(new Error("Invalid file type. Only JPG, PNG, and GIF allowed."));
        }
    
    }

const upload=multer({storage,filefilter})
module.exports={upload}