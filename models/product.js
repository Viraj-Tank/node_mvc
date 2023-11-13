const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

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

    static findById(prodId, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === prodId);
            cb(product);
        });
    }
}