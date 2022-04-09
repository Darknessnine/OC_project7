const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const path = require('path');
const app = express();
const multer = require("multer");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

const upload = multer({
  dest: './uploads/'
});

app.post('/api/post/uploadfile', upload.single("file"), (req, res) => {
  return res.send(req.file.filename)
});
 







app.use('/uploads', express.static('uploads'));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/post', postsRoutes)
app.use('/api', usersRoutes)


module.exports = app