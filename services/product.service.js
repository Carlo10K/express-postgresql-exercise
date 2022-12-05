const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
//const sequelize = require('../libs/sequelize'); //sequelize ya usa pool
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err)); //esto no es necesario si se usa sequelize
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;

    //const newProduct = {
    // id: faker.datatype.uuid(),
    //  ...data
    //}
    //this.products.push(newProduct);
    //return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
    }
    const {limit, offset} = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const products = await models.Product.findAll(options);
    return products;

    //const query = 'SELECT * FROM tasks';
    //const [data, metadata] = await sequelize.query(query); //sequelize tambien puede hacer querys
    //return {data, metadata};  //en data esta la data, metadata es info adicional
  }

  async findOne(id) {
    const product = await models.User.findByPk(id);
    if(!product){
     throw boom.notFound('user not found');
    }
    return product;

    //const query = 'SELECT * FROM tasks WHERE id='+id;
    //const product = await this.pool.query(query);  //usando pool
    //if (!product) {
    //  throw boom.notFound('product not found');
    //}
    //if (product.isBlock) {
    //  throw boom.conflict('product is block');
    //}
    //return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;

    //const index = this.products.findIndex(item => item.id === id);
    //if (index === -1) {
    // throw boom.notFound('product not found');
    //}
    //const product = this.products[index];
    //this.products[index] = {
    //  ...product,
    //  ...changes
    //};
    //return this.products[index];
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {id};

    //const index = this.products.findIndex(item => item.id === id);
    //if (index === -1) {
    //  throw boom.notFound('product not found');
    //}
    //this.products.splice(index, 1);
    //return { id };
  }

}

module.exports = ProductsService;
