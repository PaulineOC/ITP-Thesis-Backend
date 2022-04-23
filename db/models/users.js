'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //this.hasMany(models.Interactive);
        }

        static async createUser(userToCreate){

            try {
                const result = await sequelize.transaction(async (t) => {

                    const newUser = this.build(userToCreate);
                    const createdUser = await newUser.save({transaction: t});
                    if(createdUser.id === undefined || createdUser.id === null){
                        throw new Error('CreatedUser has null or undefined id');
                    }
                    return createdUser;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back createHall: ", error);
            }
        }
    };
    User.init({
        username: DataTypes.STRING,
        savedArt: Data.Types.ARRAY(DataTypes.STRING),
        overheadImages: DataTypes.ARRAY(DataTypes.STRING),
        wallImages: DataTypes.ARRAY(DataTypes.STRING),
    }, {
        sequelize,
        modelName: 'User',
        underscored: true
    });
    return User;
};
