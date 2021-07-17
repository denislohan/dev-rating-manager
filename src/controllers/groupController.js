/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import engineerService from '../services/engineerService';
import userService from '../services/userService';
import Response from '../helpers/response';

class EngineerService {
  async createOrRemove(req, res, next) {
    console.log('in groups')
    try {
      const { engineers } = req.body;
      const { user } = req;
      console.log('in engineers', engineers)
      console.log('user', user)


      if (user.role !== 'Manager') return Response.authorizationError(res, 'you have no rights to perform this operation');
     
      const { id } = user;
      await Promise.all(
        engineers.map(async (engineerId) => {
          console.log("engineer",engineerId)
          const engineer = await userService.find({ id: engineerId });
          if (!engineer) {
            return Response.notFoundError(res, `engineer ${engineerId} is not found`);
          }
        }),
      );
      const result = await engineerService.createOrUpdateGroup(id, engineers);
      return Response.customResponse(res, 200, 'operation performed successfully', result);
    } catch (error) {
       console.log("Error", error)
      return next(error);
    }
  }
}

export default new EngineerService();
