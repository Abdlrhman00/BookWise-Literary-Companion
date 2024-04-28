
//const dbService = require('../dbServices.js');


document.addEventListener('DOMContentLoaded', function () {
    console.log("dom loaded");
    //link_number();
    // const pageLinks = document.querySelectorAll('#bottom-bar');

    // pageLinks.forEach(link => {
    //     link.addEventListener('click', event => {
    //         console.log("link clicked");

    //       event.preventDefault(); // Prevent the default behavior of the link
    //       const page = link.getAttribute('id'); // Get the href of the clicked link
    //       fetch(`/home?page=${page}`)
    //       .then(response => response.json()) 
    //         .then(data => {
    //             console.log('data came');
    //         //   if(data.succes){
    //         //       generateBooks(data.data);
    //         //   }
    //         })
    //         .catch(error => {
    //           // Handle errors
    //           console.error('Error fetching books:', error);
    //         });
    //         console.log("fetch ended");

    //     });
    // });
    //const categoryId = 1; // Replace with the actual category ID

   // const page = 1; // Replace with the desired page number
    
   
});

// document.addEventListener('DOMContentLoaded', () => {
//     const pageLinks = document.querySelectorAll('#page-links-container a');
  
//     pageLinks.forEach(link => {
//       link.addEventListener('click', event => {
//         event.preventDefault(); // Prevent the default behavior of the link
//         const url = link.getAttribute('href'); // Get the href of the clicked link
//         fetch(url) // Initiate a fetch request to the URL
//           .then(response => response.json();
//           })
//           .then(data => {
//             // Process the fetched data as needed
//           })
//           .catch(error => {
//             console.error('Fetch error:', error);
//           });
//       });
//     });
//   })

// navigation links
document.getElementById('newbook-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of following the link
    let currentUrl = window.location.href; // Get the current URL
    let newUrl = currentUrl.replace('/home', '/newbook'); // Replace '/home' with '/newbook'
    window.location.href = newUrl;

    // Your custom action here
   //alert('You clicked the URL!'); // For example, show an alert
  });
  

function generateBooks(books){
    // Assuming books is an array of book objects with properties like title, cover_photo, short_description, and author_name
    const booksContainer = document.getElementById('books-container');

    // Clear any existing content in the books container
    booksContainer.innerHTML = '';

    // Loop through the books and create a div for each book
    books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    // Create elements for book details
    const title = document.createElement('h2');
    title.textContent = book.title;

    const coverPhoto = document.createElement('img');
    coverPhoto.src = book.cover_photo;
    coverPhoto.alt = book.title;

    const description = document.createElement('p');
    description.textContent = book.short_description;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author_name}`;

    // Append the elements to the book div
    bookDiv.appendChild(title);
    bookDiv.appendChild(coverPhoto);
    bookDiv.appendChild(description);
    bookDiv.appendChild(author);

    // Append the book div to the books container
    booksContainer.appendChild(bookDiv);
    });
}

  function link_number(){
    // Assuming totalBooksCount is the total number of books in the database
    console.log('calculating..');
    const booksPerPage = 10;
    const db = dbService.getDbServiceInstance();
    const totalBooksCount = db.totalBooksCount();
    const totalPages = Math.ceil(totalBooksCount / booksPerPage);

    // Generate page links based on the total number of pages
    const pageLinksContainer = document.getElementById('bottom-bar');

    for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = `/home/${categoryId}?page=${i}`;
    pageLink.textContent = i;
    pageLinksContainer.appendChild(pageLink);
    }  
  };