const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const dbService = require('../dbServices');


router.use(cors());

router.get('/home',(req,res) => {
    res.send("<h1>admin home</h1>");
})
router.get('/newbook',(req,res) => {
    const filePath = path.join(path.resolve(__dirname,'..'), 'views', 'newbook.html');
    res.sendFile(filePath);
});

router.post('/newbook',  upload.single('coverPhoto'), (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;
    const coverPhoto = req.file.buffer.toString('base64'); // No need to use .value for file
    const publishDate = req.body.publishDate;
    const buyUrl = req.body.buyUrl;
    const authorName = req.body.authorName;
    const userId = req.body.userId;
   
    const db = dbService.getDbServiceInstance();

    const addBook = db.addNewBook(title, description, categoryId, coverPhoto, publishDate, buyUrl, authorName, userId);

    addBook
    .then(data => {
        res.json({ success: true, message: 'Book added successfully' });
    })
    .catch(error => {
        console.error('Error adding book:', error);
        res.status(500).json({ success: false, message: 'Error adding book' });
    });  

});

// router.post('/newbook', upload.single('coverPhoto'), (req, res) => {
//     const title = req.body.title.value;
//     const description = req.body.description.value;
//     const category = req.body.category.value;
//     const wordCount = req.body.wordCount.value;
//     const coverPhoto = req.file.value;
//     const publishDate = req.body.publishDate.value;

//     // Process the form data as needed
//     //add databse query

//     //res.json({ success: true , message: 'Book added successfully' });
//     console.log(req.body);
//     console.log('Book is added to database UserID: '+req.params.id);
// });

module.exports = router;
