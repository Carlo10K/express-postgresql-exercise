const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
//const getConnection = require('../libs/postgres');


class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
   //si quiero mandar un erorr boom
   //   const user = await models.User.findAll({
   //   where:{
   //     email: data.email
   //   }
   // })
   // if(user){
   //   throw boom.conflict('email already exists');
   // }
   // const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const response = await models.User.findAll();   //aqui obtenemos la data desde la clase porque ya no nos referimos a la bd, eso lo hace sequelize
    return response;

    //const client = await getConnection();
    //const response = await client.query('SELECT * FROM tasks');
    //return response.rows;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
     throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = UserService;
