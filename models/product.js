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
    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}