const db = require('./db')

const productList = [
  {
    name: "Wireless Headphones",
    description: "Bluetooth over-ear headphones with noise cancellation.",
    price: 2999,
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Headphones"
  },
  {
    name: "Smartphone X20",
    description: "6.5-inch display, 128GB storage, 48MP dual camera.",
    price: 25999,
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Smartphone"
  },
  {
    name: "Gaming Laptop Pro",
    description: "16GB RAM, RTX 3050, 512GB SSD — performance machine.",
    price: 74999,
    category: "Computers",
    image: "https://via.placeholder.com/300x200?text=Laptop"
  },
  {
    name: "Office Chair",
    description: "Ergonomic design with lumbar support for long hours.",
    price: 5499,
    category: "Furniture",
    image: "https://via.placeholder.com/300x200?text=Chair"
  },
  {
    name: "Wooden Study Table",
    description: "Minimalist solid wood workstation table.",
    price: 6999,
    category: "Furniture",
    image: "https://via.placeholder.com/300x200?text=Study+Table"
  },
  {
    name: "Running Shoes",
    description: "Lightweight breathable shoes for daily running.",
    price: 1799,
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Shoes"
  },
  {
    name: "Analog Wrist Watch",
    description: "Water-resistant stylish analog watch.",
    price: 1499,
    category: "Accessories",
    image: "https://via.placeholder.com/300x200?text=Watch"
  },
  {
    name: "Sunglasses",
    description: "UV protection sunglasses with premium frame.",
    price: 999,
    category: "Accessories",
    image: "https://via.placeholder.com/300x200?text=Sunglasses"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with 12-hour battery life.",
    price: 1999,
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Speaker"
  },
  {
    name: "Yoga Mat",
    description: "Non-slip textured mat suitable for all workouts.",
    price: 499,
    category: "Fitness",
    image: "https://via.placeholder.com/300x200?text=Yoga+Mat"
  },
  {
    name: "Electric Kettle",
    description: "1.5L automatic shut-off kettle.",
    price: 1299,
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Kettle"
  },
  {
    name: "Novel: The Lost Kingdom",
    description: "Bestselling fantasy adventure book.",
    price: 399,
    category: "Books",
    image: "https://via.placeholder.com/300x200?text=Book"
  }
];


const ProductTable = `
create table if not exists products (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL ,
description TEXT,
price REAL,
category TEXT,
image TEXT,
created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

`

db.exec(ProductTable)

console.log('Products table created successfully')


const UsersTable = `
create table if not exists users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
phone_no TEXT NOT NULL,
password TEXT NOT NULL,
created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`
db.exec(UsersTable)

console.log('Users table created successfully')

const EnquiriesTable = `
create table if not exists enquiries (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL, 
email TEXT NOT NULL,
message TEXT NOT NULL,
product_id INTEGER,
created_at TEXT DEFAULT CURRENT_TIMESTAMP,
foreign key(product_id) references products(id)
);
`

db.exec(EnquiriesTable)

console.log('Enquiries table created successfully')

//seed data products 
const row = db.prepare(`SELECT COUNT(*) AS total FROM products`).get();
const count = row.total;
if (count === 0){
    const insertProduct = db.prepare(`
        INSERT INTO products(name, description, price, category,image) VALUES(?,?,?,?,?)
        `)
    productList.forEach(prod=>{
        insertProduct.run(prod.name, prod.description,prod.price,prod.category,prod.image)
    })
    console.log('Seed data inserted successfully')
}
