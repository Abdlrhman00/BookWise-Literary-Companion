const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');

const dbService = require('../dbServices');

router.use(cors());
router.use(express.json());

router
.get('/signin', (req, res) => {
    const filePath = path.join(path.resolve(__dirname,'..'), 'views', 'signin.html');
    res.sendFile(filePath);
})
.post('/signin', (req, res) => {
    const {email} = req.body;
    const {password} = req.body;

    // Process the form data as needed
    //add databse query
    const db = dbService.getDbServiceInstance();

    const verifyUser = db.verifyUser(email,password);

    verifyUser
    .then((data) => {
        //console.log(data);
        if(data.length > 0){
            const userInfo = db.getUserEssInfo(email);
            userInfo
            .then(data => res.json({ success: true, data: data }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));   
            
        }else{
            res.json({success: false, message: 'Login failed. Invalid credentials'});
        }
    })
    .catch(err => console.log(err));
});

router.get('/signup', (req, res) => {
    const filePath = path.join(path.resolve(__dirname,'..'), 'views', 'signup.html');
    res.sendFile(filePath);
})
.post('/singup', (req,res) => {
    const { email, password, first_name, last_name } = req.body;

    console.log(req.body.firstName);
    // Process the form data as needed
    //add databse query
    const db = dbService.getDbServiceInstance();

    const checkEmail = db.findEmail(email);
    
    checkEmail
    .then((data) => {
        //console.log(data);
        if(data){
            const addUser = db.addUser(email,password,first_name,last_name);
            addUser
            .then(data => res.json({ success: true, message: 'User added succesfully' }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));   
            
        }else{
            res.json({success: false, message: 'Signup failed. email already exist'});
        }
    })
    .catch(err => console.log(err));

});

// router.get('/signup', (req, res) => {
//     const hasCookie = req.cookies;

    
// });



    
// router.get('/controllers/signin.js', (req, res) => {
//     res.setHeader('Content-Type', 'text/javascript');
//     // Your code to send the signin.js file
//   });





    // const emailFound = db.findEmail(email);

    // emailFound
    // .then(
    //     () => {
    //         const passwordFound = db.verifyPassword(email,password);
    //         passwordFound
    //         .then(() => {
    //             const userInfo = db.getUserEssInfo(email);
    //             userInfo
    //             .then(
    //                 data => res.json({ success: true, data: data }),
    //                 () => res.json({ success: false})
    //             )
    //             .catch(err => res.status(500).json({ success: false, error: err.message }));
    //         },
    //         () => res.json({ message: 'Login failed. Invalid credentials'})
    //         )
    //     },
    //     () => res.json({ message: 'User not found'})
    // )

    // console.log(emailFound);
 
    // if (emailFound) {
    //     //console.log('Email found:', email);

    //     const passwordFound = db.verifyPassword(email,password);
    //     console.log(passwordFound);


    //     if(passwordFound){
    //         const userInfo = db.getUserEssInfo(email);

    //         userInfo
    //         .then(data => res.json({ success: true, data: data }))
    //         .catch(err => res.status(500).json({ success: false, error: err.message }));           
    //     }
    //     else{
    //     res.status(401).json({ message: 'Login failed. Invalid credentials' });
    //     }    
    // }
    // else {
    //     res.status(404).json({ message: 'User not found' });
    // }


module.exports = router;
