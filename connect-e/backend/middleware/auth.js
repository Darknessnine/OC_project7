jwt = require('jsonwebtoken')
let jwtConfig = require('../config')
let jwtString = jwtConfig.jwtString


module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(
        token,
        jwtString
      )
      const userId = decodedToken.userId
      if (req.body.userId && req.body.userId !== userId || req.params.userId && req.params.userId !== userId ) {
        return res.json({
          status: '401',
          message: 'Could not login, please try again',
          data: null
        })
      } else {
        next()
      }
    } catch {
      res.json({
        status: '401',
        message: 'Login session has expired, please login again',
        data: null
      })
    }
  }