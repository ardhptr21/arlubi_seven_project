import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required().label('Name'),
  short: Joi.string().required().label('Short'),
  long: Joi.string().required().label('Long'),
  header_image: Joi.string().uri().label('Header Image'),
  card_image: Joi.string().uri().label('Card Image'),
}).options({ abortEarly: false });

export default schema;
