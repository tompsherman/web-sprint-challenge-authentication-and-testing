const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secret')

module.exports = (req, res, next) => {

  const token = req.headers.authorization

  if(!token){
    return res.status(401).json({message: 'need a token'})
  } else { 
    jwt.verify(token, jwtSecret, (error, decoded)=>{
      if (error) {
        return res.status(401).json({message: 'bad token', error:error.messgae, extra:error.stack })
      } else {
        console.log('decoded token =>', decoded)
        req.decodedJwt = decoded
        next()}
  }) }
};