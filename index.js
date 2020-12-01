//server setup
const port = 8080
const express = require('express');
const admZip = require('adm-zip');
const fs = require("fs")

const cors = require('cors');
const app = express();
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.params.project === 'project1') {
           return cb(null, 'project1')
        } else {
          return  cb(null, 'project2')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})



app.use(express.json())
app.use(cors());





var upload = multer({ storage: storage }).single('file')

app.post("/upload/:project", upload, function(req, res, next) {
    const {file} = req;

    var zip2 = new admZip(file.path);
    zip2.extractAllTo(`${__dirname}/${req.params.project}`, true);

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
