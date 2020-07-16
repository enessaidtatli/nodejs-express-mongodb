const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*POST add user*/
router.post('/new', function (req, res, next) {

  const user = new Users({
    fullName: 'Enes Sasid Tatlı',
    age: 25
  });

  user.save((err, data) => {
    if (err)
      console.log(err);

    res.json(data);
  });
});


module.exports = router;
