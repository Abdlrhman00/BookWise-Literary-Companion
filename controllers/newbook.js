import {getAllCookie, userType} from './co.js';


const cookies = getAllCookie();
//console.log(cookies['userId']); 

document.getElementById('add-book-btn').addEventListener('click', function() {
    const title = document.getElementById('book-title-input').value;
    const description = document.getElementById('book-dicrip-input').value;
    const category = document.getElementById('category-input');
    const categoryId = category.options[category.selectedIndex].id;
    const coverPhoto = document.getElementById('cover-photo').files[0];
    const publishDate = document.getElementById('publish-date').value;
    const authorName = document.getElementById('author-input').value;
    const buyUrl = document.getElementById('buyUrl-input').value;
    const userId = cookies['userId'];
    //const userName = cookies['firstName'];
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('publishDate', publishDate);
    formData.append('userId', userId);
    formData.append('buyUrl', buyUrl);
    formData.append('authorName', authorName);
    formData.append('coverPhoto', coverPhoto);
    
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch((error) => {
        console.error('Error during adding book:', error);
    });
});





