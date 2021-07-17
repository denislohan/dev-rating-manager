import jwt from 'jsonwebtoken';
import userService from '../services/userService';

const { JWT_SECRET, FRONTEND_URL } = process.env;
/**
 * @class AuthController
 * @classdesc AuthController
 */
class AuthController {
  /**
   * Login Callback method.
   * @function loginCallback
   * @param {Object} req request Object.
   * @param {Object} res response Object.
   * @returns {Object} response Object.
   */
  static async loginCallback(req, res) {
    try {
      const [dbUser] = await userService.findOrCreateUser(req.user);
      console.log("done......>>>")
      const user = dbUser.dataValues;
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
      const apiResponse = {
        status: 200,
        message: 'Successfully logged in',
        data: { token },
      };
      const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
      return res.redirect(`${FRONTEND_URL}/login?code=${responseBuffer.toString('base64')}`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const apiResponse = {
          status: 422,
          message: error.errors[0].message,
          error: 'Validation Error',
        };
        const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
        return res.redirect(`${FRONTEND_URL}/login?code=${responseBuffer.toString('base64')}`);
      }
      // return Response.serverError(res, error);
      const apiResponse = {
        status: 500,
        message: error,
        error: 'Server Error',
      };
      const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
      return res.redirect(`${FRONTEND_URL}/login?code=${responseBuffer.toString('base64')}`);
    }
  }
}

export default AuthController;
