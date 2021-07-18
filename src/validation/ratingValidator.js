/* eslint-disable import/no-unresolved */
import Response from '../helpers/response';
import Schema from './schema/index';
import Joi from '@hapi/joi';
import  { ratingBody }  from "../validation/schema/rating";
class RatingValidator {
    static async validateCreate(req, res, next) {
        const schema = Joi.object().keys({
         ...ratingBody
        });
        const { error } = schema.validate(req.body);
        if (error) {

            console.log(error)
            
            return Response.validationError(res, `${error}`)};        next();
    }

    static async validateUpdate(req, res, next) {
        const schema = Joi.object().keys({
         ...ratingBody,
         id: Schema.id
        });
        const { error } = schema.validate({ ...req.body, ...req.params });
        if (error) {

            console.log(error)
            
            return Response.validationError(res, `${error}`)};
        next();
    }
}

export default RatingValidator;
