/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        
        googleId: '107620012741405968837',
        firstName: 'Super',
        lastName: 'LF',
        email: 'admin@gmail.com',
        role: 'Super LF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'denis',
        lastName: 'denis',
        email: 'denis@gmail.com',
        role: 'Engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'sam',
        lastName: 'sam',
        email: 'sam@gmail.com',
        role: 'Engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'maiyo',
        lastName: 'maiyo',
        email: 'manager@gmail.com',
        role: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'alfa',
        lastName: 'alfa',
        email: 'alfa@gmail.com',
        role: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   googleId: '108282791791495231796',
      //   firstName: 'Amily',
      //   lastName: 'Kassim',
      //   email: 'amily.kassim@andela.com',
      //   role: 'LF',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstName: 'second',
      //   lastName: 'lf',
      //   email: 'lf2@gmail.com',
      //   role: 'LF',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },

    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
