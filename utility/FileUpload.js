const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req,file,callback){
        console.log('filename=>',file)
        let uploadPath = ''
        if(file.fieldname == 'upload_image'){
            uploadPath = path.join(__dirname,'../public/uploads')
        }
        // console.log('uploadpath ==>',uploadPath)
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{recursive:true});
        }
        // console.log('uploadpath==>',uploadPath)
        callback(null,uploadPath)
    },
    filename: function(req,file,callback){
        const uploadFileName = Date.now()+"."+file.originalname.split('.')[1];
        req.body.uploadFileName = uploadFileName;
        req.body.originalFileName = file.originalname;
        console.log('req.body.uploadFileName==>',req.body.uploadFileName)
        callback(null,uploadFileName)
    }
});
const upload = multer({
    storage:storage
});
module.exports=upload;