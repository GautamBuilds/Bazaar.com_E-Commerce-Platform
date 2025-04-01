const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3308;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static('public')); // Serve your HTML, CSS, JS files from a 'public' folder

// Database connection
const db = mysql.createConnection({
    host: 'localhost',    // Your database host (usually localhost)
    user: 'root',         // Your MySQL username
    password: '',         // Your MySQL password (leave empty if none)
    database: 'ecommerce_db' // Your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Example route to get all products
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
});

// Example route to add a product
app.post('/api/products', (req, res) => {
    const { name, price, description } = req.body;
    const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    db.query(query, [name, price, description], (err, result) => {
        if (err) {
            res.status(500).send('Error adding product');
            return;
        }
        res.status(201).send('Product added');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});