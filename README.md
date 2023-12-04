MVC (Model View Controller)

npm install --save mysql2

npm install --save sequelize
sequelize - Object Relational Mapping Library
    - Models (e.g User, Product)
    - Instances (const user = User.build())
    - Queries (User.findAll())
    - Associations (User.hasMany(Product))

SQL
 - uses strict data schemas and relations
 - connect mysql2 to use sql with node