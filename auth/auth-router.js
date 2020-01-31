const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { jwtSecret } = require('../config/secrets')

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user)
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: 'invalid credentials' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

const signToken = user => {
  const payload = {
    sub: 'logged in token',
    type: 'user',
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
