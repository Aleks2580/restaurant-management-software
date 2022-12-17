const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { password } = req.body;

 
  try {
    const user = await User.findOne({ where: { password } });
    req.session.user = user.fullName;
    req.session.userRole = user.role;
    req.session.userPassword = user.password;
    req.session.userId = user.id;
    req.session.save(() => {
      res.json({ name: user.fullName, role: user.role, id: user.id, password: user.password })
    })
    
  } catch (error) {
    res.json('Password is incorrect')
  }
})


module.exports = router;