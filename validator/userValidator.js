import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  nis: Joi.number()
    .custom((val, helper) => {
      if (val.toString().length !== 10) return helper.message('NIS must be 10 digits');
      return val;
    })
    .required()
    .label('NIS'),
  class: Joi.string().required().label('Class'),
  password: Joi.string().min(8).required().label('Password'),
});

export default schema;
