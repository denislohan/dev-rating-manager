/* eslint-disable no-useless-catch */
import database from '../database/models';

const { group } = database;

class EngineerService {
  static createOrUpdateGroup(manager, engineers) {
    return group.findOne({
      where: { manager },
    }).then((user) => {
      if (!user) {
        return group.create({ manager, engineers });
      }
      return group.update({ engineers }, { returning: true, where: { manager } });
    }).catch((error) => { throw error; });
  }
}
export default EngineerService;
