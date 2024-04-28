const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'AMA',
    password: 'AMA2023',
    database: 'bookwise',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        //return new DbService();

       return instance ? instance : new DbService();
    }

    async addNewBook(title, description, categoryId, coverPhoto, publishDate, buyUrl, authorName, userId) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO books (title, description, category_id, cover_photo, publication_date, buy_link, author_name, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                connection.query(query, [title, description, categoryId, coverPhoto, publishDate, buyUrl, authorName, userId], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else {
                        console.log('New book added:', results);
                        resolve(results);
                    }
                });
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllBooksPagination(page, limit) {
        //console.log('db service');
        try {
            const offset = (page - 1) * limit;
            const query = `
            SELECT title, book_id, LEFT(description, 120) AS short_description, cover_photo, author_name
             FROM (
                SELECT *, ROW_NUMBER() OVER(PARTITION BY category_id ORDER BY book_id) AS rn
                FROM books
            ) AS ranked_books
            WHERE rn <= 1
            ORDER BY category_id, book_id
            LIMIT 8 OFFSET ?;    
            `;
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [offset], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return results;
        } catch (error) {
            throw error;
        }
        
    }

    async getBooksByCategoryWithPagination(categoryId, page, limit) {
        //console.log('db service');
        try {
            const offset = (page - 1) * limit;
            const query = `
            SELECT title, LEFT(description, 120) AS short_description, author_name, cover_photo, book_id
            FROM books
            WHERE category_id = (SELECT category_id FROM categories WHERE category_name= ?)
            ORDER BY book_id
            LIMIT ? OFFSET ?           
            `;
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [categoryId, limit, offset], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return results;
        } catch (error) {
            throw error;
        }  
    }

    async getBookInfo(bookId) {
        //console.log('db service');
        try {
            const query = `
            SELECT title, book_id, description, cover_photo, author_name, category_id, buy_link FROM books WHERE book_id = ?;            `;
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [bookId], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            //console.log(results);
            return results;
        } catch (error) {
            throw error;
        }  
    }

    async likeBook(userId, bookId) {
        try {
            const query = "INSERT INTO rates (book_id, user_id, `like`) VALUES (?, ?, '1')";
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [bookId, userId], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            return results;
        } catch (error) {
            throw error;
        }
    }

    async checkLikeBook(userId, bookId) {
        try {
            const query = "SELECT `like` FROM rates WHERE book_id=? AND user_id=?;";
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [bookId, userId], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            return results;
        } catch (error) {
            throw error;
        }
    }  
    
    async getFavorite(userId) {
        try {
            const query = "SELECT b.title, LEFT(b.description, 120) AS short_description, b.author_name, b.cover_photo, b.book_id FROM books b JOIN rates r ON b.book_id = r.book_id WHERE r.user_id = ? AND r.`like` = 1;           ";
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [userId], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            console.log('fav',results);
            return results;
        } catch (error) {
            throw error;
        }
    }   

    async totalBooksCount() {
        return new Promise((resolve, reject) => {
          connection.query('SELECT COUNT(*) AS total_books FROM books', function (error, results, fields) {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              const totalBooksCount = results[0].total_books;
              resolve(totalBooksCount);
            }
          });
        });
      }
    
    async totalBooksCountByCategory(categoryName) {
        try {
            const query = `SELECT COUNT(*) AS total_books FROM books WHERE category_name ?;`;
            const results = await new Promise((resolve, reject) => {
                connection.query(query,[categoryName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results[0].total_books);
                });
            });
            return results;
        } catch (error) {
            throw error;
        }
        
    }
    

    async findEmail(inputEmail) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT email FROM users WHERE email=?";
    
                connection.query(query, [inputEmail], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        if (results.length > 0) {
                            resolve(false); //indicates that the email already exist
                        } else {
                            resolve(true); // indicates that email is new to the database
                        }
                    }
                });
            });
            // console.log(response);
            return response;
            
    //         // Check if the response contains any rows (emails)
    //         // if (response.length > 0) {
    //         //     console.log("Email found in the database");
    //         //     // You can return a custom object or value to indicate the email was found
    //         //     return { data: response };
    //         // } else {
    //         //     console.log("Email not found in the database");
    //         //     // You can return a custom object or value to indicate the email was not found
    //         //     return false;
    //         // }
        } catch (error) {
            //console.log(error);
            // You can throw the error to be caught by the caller
            throw error;
        }
    }

    // async verifyPassword(inputEmail,inputPassword){
    //     try {
    //         const response = await new Promise((resolve, reject) => {
    //             const realPasswordQuery = "SELECT password FROM users WHERE email=?";
    
    //             connection.query(realPasswordQuery, [inputEmail], (err, results) => {
    //                 if (err) {
    //                     reject(new Error(err.message));
    //                 } else {
    //                     if (results.length > 0) {
    //                         const realPassword = results[0].password;
    //                         if (realPassword === inputPassword) {
    //                             resolve(true); // Password is correct
    //                         } else {
    //                             resolve(false); // Password is incorrect
    //                         }
    //                     } else {
    //                         resolve(false); // User not found or password not retrieved
    //                     }
    //                 }
    //             });
    //         });
    //         return response;
    //     } catch (error) {
    //         //console.log(error);
    //         // You can throw the error to be caught by the caller
    //         throw error;
    //     }
    // }

    async verifyUser(email,password){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT user_id,first_name FROM users WHERE email=? AND password=?;";
                connection.query(query, [email,password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else{
                        console.log('User logged:',results);
                        resolve(results);
                    }
                })
            });
            return response;
        }
        catch (error) {
            //console.log(error);
            // You can throw the error to be caught by the caller
            throw error;
        }
    }

    async addUser(email, password, firstName, lastName){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
                connection.query(query, [email,password,firstName,lastName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else{
                        console.log('User Added:',results);
                        resolve(results);
                    }
                })
            });
            return response;
        }
        catch (error) {
            //console.log(error);
            // You can throw the error to be caught by the caller
            throw error;
        }

    }

    async getUserEssInfo(email){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT user_id,first_name FROM users WHERE email=?;";

                connection.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            //console.log(error);
            // You can throw the error to be caught by the caller
            throw error;
        }
    }
}

module.exports = DbService;