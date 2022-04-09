 let db = require('../dbConfig');




  exports.uploadPost = (req, res, next) => {
  let filename = req.body.filename
  console.log(filename)
  const url = req.protocol + '://' + req.get('host');
  const ImageUrl = url + "/uploads/" + filename
  let sql = 'INSERT INTO posts (Text, ImageUrl, Username) VALUES ("'+req.body.text+'","'+ImageUrl+'", "'+ req.body.username+'")'
  console.log(sql)
  db.query(sql, function (err, result, fields) {
    if (err) return res.json({
      status: err.status,
      message: err.sqlMessage,
      data: {err}
    })
    res.json({
      status: '201',
      message: 'Post saved successfully!',
      data: {
        ImageUrl
      }
    })
  })
} 

 
exports.getPosts = (req, res, next) => {
    let sql = 'SELECT posts.PostID, posts.Text, posts.ImageUrl, posts.Username FROM posts '
    db.query(sql, function (err, result, fields) {
      if (err) return res.json({
        status: err.status,
        message: err.sqlMessage,
        data: err
      })
      res.json({
        status: '200',
        message: null,
        data: result
      })
    })
  } 



/*   exports.uploadPost = (req, res, next) => {
  
    res.json("{file: req.file }");
  }  */
  
  