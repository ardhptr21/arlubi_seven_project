import Joi from 'joi';

const schema = Joi.object({
  old_password: Joi.string().required().label('Old Password'),
  new_password: Joi.string().min(8).required().label('New Password'),
  confirm_new_password: Joi.string()
    .valid(Joi.ref('new_password'))
    .required()
    .label('Confirm New Password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});

export default schema;
