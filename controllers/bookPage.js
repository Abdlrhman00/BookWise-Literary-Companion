import {getAllCookie} from './co.js';

// document.addEventListener('DOMContentLoaded', function () {
//     const likeBtn = document.getElementById('like-btn');

//     likeBtn.style.backgroundColor = '#edc001'; // Change the color to red when clicked
//     likeBtn.style.color = 'white';

// });

document.getElementById('like-btn').addEventListener('click', function() {
    const cookies = getAllCookie();
    const likeBtn = document.getElementById('like-btn');

    const bookId = document.querySelector('.bground').id;
    const userId = cookies['userId'];

    if(userId === undefined)
        alert('You have to log in first');
    else{
    console.log('userId',userId);
    const requestBody = JSON.stringify({ bookId, userId });

    fetch('http://localhost:3000/like/'+userId+'/'+bookId, {
        method: 'POST'   
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        if(data.success){
           //alert('Book liked successfully');
           likeBtn.style.backgroundColor = '#edc001'; // Change the color to red when clicked
           likeBtn.style.color = 'white';
         }
    })
    .catch(error => {
        console.error('Error during adding like:', error);
    });
    }
  });

  function changeLike(){
    const likeBtn = document.getElementById('like-btn');

    likeBtn.style.backgroundColor = '#edc001'; // Change the color to red when clicked
    likeBtn.style.color = 'white';
  }