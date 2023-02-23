const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const path = require('path');
const { createWriteStream } = require("fs");
const storage = new Storage({ 
    keyFilename: path.join(__dirname,'../config/niveustraining-e48173600b3b.json'),
    projectId:'niveustraining'
});

const bucket = storage.bucket("assignment-tejas-gondhali");

class Utils {
    async uploadFileToCloudStorage(data,file) {
        const responseResult = {}
        try {
            if (!data.uploadFileName) {
                responseResult.message= "Please upload a file!"
                return responseResult
            }
            // const actualUploadedPath = path.join(__dirname,'../public/uploads/'+data.uploadFileName)
            const actualUploadedPath = file.originalname
            console.log('actualUpload=>',actualUploadedPath)
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(actualUploadedPath);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });
            blobStream.on("error", (err) => {
                console.log('error==>',err)
                responseResult.message = err.message
                return responseResult
            });
            blobStream.on("finish", async (data) => {
                console.log('finish data==>',data)
                // Create URL for directly file access via HTTP.
                const publicUrl = format(
                    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                try {
                    // Make the file public
                    await bucket.file(actualUploadedPath).makePublic();
                } catch {
                    responseResult.message=`Uploaded the file successfully: ${data.originalFileName}, but public access is denied!`;
                    responseResult.url= publicUrl
                    return responseResult
                }
                responseResult.message= "Uploaded the file successfully: " + data.originalFileName;
                responseResult.url= publicUrl
                return responseResult
            });
            blobStream.end(file.buffer);
        } catch (err) {
            responseResult.message= `Could not upload the file: . ${err}`;
            return responseResult
        }
    }
}

module.exports = new Utils()