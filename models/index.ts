import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelizeConfig from '../config/config.json';


// Define the database object type
interface DB {
  [key: string]: any ;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = (sequelizeConfig as { [key: string]: any })[env];
const db: DB = {} as DB;

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
  .forEach(file => {
    const modelModule = require(path.join(__dirname, file));
    const model = modelModule.default ? modelModule.default(sequelize, DataTypes) : modelModule(sequelize, DataTypes);
    db[model.name] = model;
  });


// Associate models if necessary
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    (db[modelName] as any).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

