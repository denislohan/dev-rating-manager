/* eslint-disable no-useless-catch */
import Sequelize from 'sequelize';
import database from '../database/models';

const { user,group } = database;
const { Op } = Sequelize;

/** Class representing user services. */

class UserService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findAllUsers(param) {
    try {
      const users = await user.findAll({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findOneUser(param) {
    try {
      const users = await user.findOne({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates returns a user.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async find(param) {
    try {
      const users = await user.findOne({
        where: param,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async findOrCreateUser(_user) {
    try {
        const {email} =  _user;
        if (email.includes('andela.com'))
        _user['role']='Manager'

            console.log("user", _user);


      const users = await user.findOrCreate({
        where: { googleId: _user.googleId }, defaults: _user,
      });

      return users;
    } catch (error) {
      console.log(error)

      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */
  static async updateUser(user, param) {
    try {
      const users = await user.update(user, {
        where: param,
        returning: true,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns {*} users
   */
  static async getEngineersByManager(manager) {
    const groups = await group.findAll({
      where: { manager },
    });

    return groups;
  }

  

  /**
   * @returns {*} users
   */
   static async getAllTrainees() {
    //console.log("manager===>",manager)
    const engineers = await group.findAll();

    return engineers;
  }

  /**
   * Get user by id
   * @param {string}  params be checked against
   * @return {object} Oject of request if found
   */
  static async getSingleEngineer(params) {
    try {
      const user = await database.user.findOne({
        attributes: {
          exclude: ['password'],
        },
        where: params,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
