const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().max(50);
const lastName = Joi.string().max(50);
const phone = Joi.number().integer().min(8);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: createUserSchema
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  user: updateUserSchema
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
 createCustomerSchema,
 updateCustomerSchema,
 getCustomerSchema
}
