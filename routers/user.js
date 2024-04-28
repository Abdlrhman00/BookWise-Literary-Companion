const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

const dbService = require('../dbServices');

router.use(cors());
router.use(express.json());


router.get('/home', async (req, res) => {
    //console.log('back-end GET..');
    const page = req.query.page || 1; // Default to page 1 if not specified
    const booksPerPage = 2;
    const offset = (page - 1) * booksPerPage;
    
    const db = dbService.getDbServiceInstance();
    //console.log('page= ',page);

    const books = db.getAllBooksPagination(page,booksPerPage);
    const totalBooksCount = await db.totalBooksCount();
    const realCount = (Math.ceil(totalBooksCount / 8));
    //console.log('count',totalBooksCount);
    const hasCookie = req.cookies.userId;
    //console.log('hasCookie',hasCookie);

    books
    .then (data => {
        console.log(books);
        //res.json({ success: true, data: books });
        const home = path.join(path.resolve(__dirname,'..'), 'views', 'user-home');
        res.render((home), {books: data ,currentPage: page , totalPages: realCount , hasCookie}); 
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error retreving books' });
    })    
});

router.get('/categories', async (req, res) => {
    //console.log('back-end GET..');
    const page = req.query.page || 1; // Default to page 1 if not specified
    const booksPerPage = 2;
    const offset = (page - 1) * booksPerPage;
    
    const db = dbService.getDbServiceInstance();
    //console.log('page= ',page);

    const books = db.getAllBooksPagination(page,booksPerPage);
    const totalBooksCount = await db.totalBooksCount('Children');
    const realCount = (Math.ceil(totalBooksCount / 8));

    const hasCookie = req.cookies.userId;

    books
    .then (data => {
        console.log(books);
        //res.json({ success: true, data: books });
        const categories = path.join(path.resolve(__dirname,'..'), 'views', 'categories');
        res.render((categories), {books: data , categoryName: '' , currentPage: page , totalPages: realCount , hasCookie}); 
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error retreving books' });
    })    
});

router.get('/categories/:category', async (req,res) => {
    const categoryName = req.params.category;
    const page = req.query.page || 1; // Default to page 1 if not specified
    const booksPerPage = 8;
        
    const db = dbService.getDbServiceInstance();
    
    const categoryBooks = db.getBooksByCategoryWithPagination(categoryName, page, booksPerPage);
    const totalBooksCount = await db.totalBooksCount(categoryName);
    const realCount = (Math.ceil(totalBooksCount / 8));

    const hasCookie = req.cookies.userId;

    //console.log('count',realCount);

    categoryBooks
    .then (data => {
        console.log(categoryBooks);
        //res.json({ success: true, data: books });
        const categories = path.join(path.resolve(__dirname,'..'), 'views', 'categories');
        res.render((categories), {books: data, categoryName , currentPage: page , totalPages: realCount , hasCookie}); 
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error retreving books' });
    })    

});

router.get('/submit',(req,res) => {
    const hasCookie = req.cookies.userId;

    const submit = path.join(path.resolve(__dirname,'..'), 'views', 'newbook.ejs');
    res.render(submit , {hasCookie});
});

router.post('/submit',  upload.single('coverPhoto'), (req, res) => {
    const imagePath=req.file.path;
    const img = fs.readFileSync(imagePath);
    const coverPhoto = Buffer.from(img);

    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;
    //const coverPhoto = req.file.toString('base64');  
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

router.get('/book/:bookId', (req,res) => {
    //console.log('Route /book/:bookId accessed');

    const bookId = req.params.bookId;
    const hasCookie = req.cookies.userId;

    const db = dbService.getDbServiceInstance();
    
    const bookInfo = db.getBookInfo(bookId);
    const checkLike = db.checkLikeBook(bookId,hasCookie);
   // res.send("hi");
   // console.log('chechLike',checkLike);
    
    bookInfo
    .then (data => {
        //console.log(data);
        //res.json({ success: true, data: books });
        checkLike
        .then(like => {
            console.log('like',like);
        })
        const bookPage = path.join(path.resolve(__dirname,'..'), 'views', 'bookPage.ejs');
        res.render((bookPage), {book: data , hasCookie  }); 
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error retreving books' });
    })    

});

router.post('/like/:userId/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const db = dbService.getDbServiceInstance();
    
    const likeBook = db.likeBook(userId, bookId);
   // res.send("hi");
    
    likeBook
    .then (data => {
        //console.log(data);
        res.json({ success: true , message: 'Like added successfully' });
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error liking book' });
    })    
});

router.get('/favorites', (req,res) => {
    //console.log('Route /book/:bookId accessed');

    const hasCookie = req.cookies.userId;
    const userId = req.cookies.userId;

    const db = dbService.getDbServiceInstance();
    
    const bookInfo = db.getFavorite(userId);
    //const checkLike = db.checkLikeBook(bookId,hasCookie);
   // res.send("hi");
   // console.log('chechLike',checkLike);
    
    bookInfo
    .then (data => {
        console.log('favorites',data);
       // res.send('favorites');
        //res.json({ success: true, data: books });
        const bookPage = path.join(path.resolve(__dirname,'..'), 'views', 'favorites.ejs');
        res.render((bookPage), {books: data , hasCookie}); 
    })
    .catch(error => {
        console.error('Error retreving books:', error);
        res.status(500).json({ success: false, message: 'Error retreving books' });
    })    

});

module.exports = router;
