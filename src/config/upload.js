const multer = require('multer');
const path = require('path');

module.exports = {

    storage: multer.diskStorage({

        destination: path.resolve(__dirname,'..','..','uploads'), //dirname raiz do projeto
        filename: (req,file,callback) => {

            if(!file) {

                return callback(new Error('File is empty'));

            }

            const extension = path.extname(file.originalname);
            const name = path.basename(file.originalname, extension);
            callback(null, `${name}-${Date.now()}${extension}`);

        }

    })

}
