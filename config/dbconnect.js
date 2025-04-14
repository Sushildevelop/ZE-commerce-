const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ZECOMMERCE', 'root', '', {
  host: 'localhost',

  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const dbconnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}



module.exports = { dbconnection, sequelize }