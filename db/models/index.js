const { User, UserSchema } = require('./user.model');//importar modelos
const { Customer, CustomerSchema } = require('./customer.model');//importar modelos
const { Category, CategorySchema  } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize)); //aqui iran todos los modelos
  Customer.init(CustomerSchema, Customer.config(sequelize)); //aqui iran todos los modelos
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
