/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import Response from '../helpers/response';

/**
 * @class bookingValidation
 */
export default class listValidator {
  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async list(req, res, next) {
    const schema = Joi.object({
      engineers: Joi.array()
        //.items(Schema.id)
        //.single()
        //.required()
        .error((errors) => new Error('Array of engineers id is required must be integrs')),
    });
    // validator(schema, req.body, res, next);
    const { error } = schema.validate(req.body);
    if (error) return Response.validationError(res, `${error}`);
    next();
  }
}
