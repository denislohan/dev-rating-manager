/* eslint-disable no-restricted-globals */
import Sequelize from 'sequelize';
import Response from '../helpers/response';
import UserService from '../services/userService';

const { Op } = Sequelize;

const { findAllUsers, getEngineersByManager, getSingleEngineer } = UserService;

/**
 * @class AuthController
 * @classdesc AuthController
 */
class UserController {
  /**
   * Login Callback method.
   * @function loginCallback
   * @param {Object} req request Object.
   * @param {Object} res response Object.
   * @returns {Object} response Object.
   */
  static async updateRole(req, res) {
    try {
      if (req.user.role !== 'Super LF') return Response.authorizationError(res, 'You do not have access to perform this action');
      const { email } = req.body;
      const check = await UserService.findOneUser({ email });
      if (!check) return Response.notFoundError(res, 'User not found');
      if (check.role === 'LF') return Response.badRequestError(res, 'The user is already an LF');
      const user = await UserService.updateUser({ role: 'LF' }, { email });
      return Response.customResponse(res, 200, 'Successfully updated the user to LF', user[1][0]);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') return Response.validationError(res, error.errors[0].message);
      return Response.serverError(res, error);
    }
  }

  static async viewAllProfiles(req, res) {
    let engineerIds,allUsers;
    if (req.user.role !== 'Manager') return Response.authorizationError(res, 'You do not have access to perform this action');

    //console.log("id ===>", req.user.id)
    const results = await getEngineersByManager(req.user.id);
    //console.log("Engineers===>", results)

    // if there is engineers


    if (results[0]) {
      engineerIds = results[0].dataValues.engineers;
      console.log("Engineers", engineerIds)
      if(engineerIds[0])
        allUsers = await findAllUsers({ id: { [Op.or]: engineerIds }, role: 'Trainee' });

      return Response.customResponse(res, 200, 'success', allUsers);
    }

    return Response.badRequestError(res, 'No engineers found');
  }

  static async getAllUsers(req, res, next) {
   // console.log("getting all userrs=====<><><====")
    try {
      if (req.user.role === 'Trainee') return Response.authorizationError(res, 'You do not have access to perform this action');
      // if there is engineers
      const results = await UserService.findAllUsers({});
     // console.log('results=======>',results)

      return Response.customResponse(res, 200, 'success', results);
    } catch (error) {
      return next(error);
    }
  }

  static async viewSingleProfile(req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id, 10))) Response.badRequestError(res, 'enter a valid user id');

    if (req.user.role === 'Engineer' && parseInt(id, 10) !== req.user.id) {
      return Response.authorizationError(res, 'Don\'t  have previelage to access this end point');
    }

    const user = await getSingleEngineer({ id });

    if (!user) Response.notFoundError(res, 'User not found');

    return Response.customResponse(res, 200, 'User found successfully', user);
  }

  static async getMyProfile(req, res) {
    const user = await getSingleEngineer({ id: req.user.id });
    if (!user) Response.notFoundError(res, 'User not found');
    return Response.customResponse(res, 200, 'Profile retrieved successfully', user);
  }
}

export default UserController;
