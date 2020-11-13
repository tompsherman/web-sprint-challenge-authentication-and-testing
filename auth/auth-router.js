const bcrypt = require('bcryptjs')
const router = require('express').Router();

const Users = require('../users/userModels')

const {isValid} = require('../users/userService')
const {jwtSecret} = require('./secret')

const jwt =require('jsonwebtoken')

router.get('/test', (req,res)=>{ 
  res.status(200).json({message: 'working'})
 })

router.post('/register', async (req, res) => {
  // implement registration
  const credentials = req.body
  
  if(isValid(credentials)){
    const rounds = process.env.BCRYPT_ROUNDS || 8

    const hash = bcrypt.hashSync(credentials.password, rounds)

    credentials.password = hash

    Users.create(credentials)
    .then(user => {
      res.status(201).json({data: user})
    })
    .catch(error => {
      res.status(500).json({message: error.message, error: error.stack})
    })
  } else {
    res.status(400).json({
      message: "provide alphanumeric username and password"
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  if(isValid(req.body)) {
    Users.findBy({username:username})
    .then(([user]) => {
      if(user&& bcrypt.compareSync(password, user.password)){
        const token = makeToken(user)
        res.status(200).json({message: 'welcome user', token})
      } else {
        res.status(401).json({message: 'invalid credentials'})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message, error: error.stack})
  })
  } else {
    res.status(400).json({ message: 'please provide valid u/p'})
  }
});

function makeToken(user){
  const payload ={
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '30 minutes'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
