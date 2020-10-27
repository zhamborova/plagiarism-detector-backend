//server setup
const port = 8080
const express = require('express');

const multer = require("multer");
var upload = multer({ dest: './mutles' })
//this cors is so I can access server from react app that runs on localhost:3000
const cors = require('cors');
const app = express();


app.use(express.json())
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));



app.post('/hello', (req, res) => {

    res.send({res:'what up client'})
})

app.post('/',(req, res) => {
    console.log(req.file)
    res.send({res:'received zip'})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
