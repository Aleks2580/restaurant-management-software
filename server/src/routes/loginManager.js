const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { password } = req.body;

 
  try {
    const user = await User.findOne({ where: { password } });
    req.session.user = user.fullName;
    req.session.userRole = user.role;
    req.session.password = user.password;
    req.session.save(() => {
      res.json({ name: user.fullName, role: user.role})
    })
    
  } catch (error) {
    res.json('Password is incorrect')
  }
})


module.exports = router;