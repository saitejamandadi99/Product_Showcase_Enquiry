const db = require('./database/db');

const products = db.prepare("SELECT * FROM products").all();

console.log(products);
