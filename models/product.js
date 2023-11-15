const Sequalize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define(
    'product', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequalize.STRING,
    price: {
        type: Sequalize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequalize.STRING,
        allowNull: false
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false
    }
});

module.exports = Product;

/* const fs = require('fs')
const path = require('path')
const Cart = require('../models/cart')
const rootDir = require('../util/path')
const db = require('../util/database')

// here data is folder and .json is filename
const p = path.join(
    rootDir,
    'data',
    'products.json'
)

const getProductsFromFile = cb => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        return db.execute('INSERT INTO products(title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static deleteById(id) {

    }

    static findById(id) {
        return db.execute('SELECT * FROM products where products.id=?',
            [id]
        );
    }

    /* 
    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProduct = products.filter(prod => prod.id != id);
            fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        });
    }

    static findById(prodId, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === prodId);
            cb(product);
        });
    } 
}
*/