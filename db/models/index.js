const { User, UserSchema } = require('./user.model');//importar modelos

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize)); //aqui iran todos los modelos
}

module.exports = setupModels;
