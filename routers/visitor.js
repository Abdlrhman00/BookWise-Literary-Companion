const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');

router.use(cors());
router.use(express.json());

router.get('/home',(req,res) => {
    const home = path.join(path.resolve(__dirname,'..'), 'views', 'user-home.html');
     res.render(home);    
});

router.get('/newbook',(req,res) => {
    res.send('<h1> You have to login first, Create account<h1>');
});





module.exports = router;
