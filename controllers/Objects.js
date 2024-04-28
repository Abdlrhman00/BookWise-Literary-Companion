export class User {
    constructor(userId, firstName, email='', password='', lastName='') {
      this.userId = userId;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    publishBook(book) {
      // Logic to publish a book
    }
  
    rateBook(book, rating) {
      // Logic to rate a book
    }
  
    commentOnBook(book, comment) {
      // Logic to comment on a book
    }
  }
  
  // Book class
  class Book {
    constructor(bookId, name, date, url) {
      this.bookId = bookId;
      this.name = name;
      this.date = date;
      this.url = url;
    }
  }
  
  // Category class
  class Category {
    constructor(categoryId, categoryName) {
      this.categoryId = categoryId;
      this.categoryName = categoryName;
    }
  }
  module.exports = User;
