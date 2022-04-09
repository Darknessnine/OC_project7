const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let db = require('../dbConfig');
let jwtConfig = require('../config')
let jwtString = jwtConfig.jwtString

exports.signup = (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 12).then(hash => {
      let sql = 'INSERT INTO Users (Username, Email, Password) VALUES ("' + req.body.username + '", "' + req.body.email + '", "' + hash + '")'
      db.query(sql, function (err, result, fields) {
        res.json({
          status: '201',
          message: 'User saved successfully!',
          data: null
        })
      })
    })
  } catch (error) {
    console.error(err.message)
  }
}

exports.login = (req, res, next) => {
  let sqlFind = 'SELECT * FROM Users WHERE email="'+req.body.email+'";'
  db.query(sqlFind, function (err, result, fields) {
    if (err) return res.json({
      status: err.status,
      message: err.sqlMessage,
      data: err
    })
    if (result.length < 1) return res.json({
        status: '404',
        message: 'User Not Found',
        data: null
      })
      bcrypt.compare(req.body.password, result[0].Password)
        .then(valid => {
          if (!valid) {
            return res.json({
              status: '401',
              message: 'Incorrect Password!',
              data: null
            })
          }
          const token = jwt.sign(
            { userId: result[0].UserID },
            jwtString,
            { expiresIn: '1h' }
          )
          res.json({
            status: '200',
            message: 'null',
            data: {
              userId: result[0].UserID,
              token: token,
              username: result[0].Username,
              email: result[0].Email
            }
          })
        }).catch(err => {
          res.json({
            status: '500',
            message: null,
            data: err
          })
        })
    })
}

 exports.deleteProfile = (req, res, next) => {
  let sql = 'DELETE FROM users WHERE UserID ="'+req.params.id+'";'
  db.query(sql, function (err, result, fields) {
    if (err) return res.json({
      status: err.status,
      message: err.sqlMessage,
      data: err
    })
    res.json({
      status: '200',
      message: 'Profile Deleted',
      data: null
    })
  })
}
 















