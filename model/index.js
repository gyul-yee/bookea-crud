const dbConfig = require('./mysql')
const Sequelize = require('sequelize')

const sequelizeConfig = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorAliases: false
    }
)

const db = {}
db.sequelize = Sequelize
db.sequelizeConfig = sequelizeConfig
db.tutorial = require('./reader.model')(sequelizeConfig, Sequelize)

module.exports = db