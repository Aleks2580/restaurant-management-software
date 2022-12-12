const router = require('express').Router();
const { User } = require('../../../db/models');

router.post('/', async (req, res) => {
  const { password } = req.body
  try {
    
  } catch (error) {
    res.json('Password is incorrect')
  }
})