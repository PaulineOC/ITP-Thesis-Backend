'use strict';
const _ = require('lodash');
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

        static async createUser(userName, unique){
            try {
                const result = await sequelize.transaction(async (t) => {
                    const newUser = this.build({ username: userName, uniqueId: unique});
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

        static async getUserById(userId, unique, transaction ){
            const user = await this.findOne({
                where:{
                    id: userId,
                    uniqueId: unique,
                }
            });
            return user;
        }

        static async getAllUsersByUsername(name){
            const allUsers = await this.findAll({
                where:{
                    username: name,
                },
                returning: true,
            });
            return allUsers;
        }

        static async addToUserSavedArt(userId, artToAdd, unique){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId, unique
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { savedArt } = user.dataValues;

                    let updatedArt = [];

                    if((!_.isNil(savedArt) || !_.isEmpty(savedArt)) && !_.includes(savedArt, artToAdd)){
                        console.log("Adding to array with values:\n");
                        updatedArt = _.cloneDeep(savedArt);
                        updatedArt.push(artToAdd);
                    }
                    else if(_.isNil(savedArt) || _.isEmpty(savedArt)){
                        console.log("Adding to originally null array:\n");
                        updatedArt.push(artToAdd);
                    }

                    const updatedUserArt = await this.update(
                        {
                            savedArt: updatedArt,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
                                uniqueId: unique,
                            },
                            transaction: t,
                        }
                    );
                    return updatedUserArt;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back AddToUserSavedArt", error);
            }
        }

        static async removeFromUserSavedArt(userId, artToRemove, unique){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        unique,
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { savedArt } = user.dataValues;

                    if(_.isEmpty(savedArt)){
                        throw new Error('Saved Art is Empty - nothing to remove from');
                    }
                    if(!_.includes(savedArt, artToRemove)){
                        return user;
                    }

                    let updatedArt = savedArt.filter((ele)=>{
                        return (ele !== artToRemove);
                    });
                    const updatedUserArt = await this.update(
                        {
                            savedArt: updatedArt,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
                                uniqueId: unique,
                            },
                            transaction: t,
                        }
                    );
                    return updatedUserArt;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back AddToUserSavedArt", error);
            }
        }

        static async updateAllUserImages(userId, wallImagesToAdd, overheadImagesToAdd, unique ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        unique
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }

                    const { wallImages, overheadImages } = user.dataValues;

                    let updatedWallImgs = [];
                    if(!_.isNil(wallImages) || !_.isEmpty(wallImages)){
                        updatedWallImgs = _.cloneDeep(wallImages);
                        updatedWallImgs.push(wallImagesToAdd);
                    }
                    else{
                        updatedWallImgs.push(wallImagesToAdd);
                    }

                    let updatedOverheadImgs = [];
                    if(!_.isNil(overheadImages) || !_.isEmpty(overheadImages)){
                        updatedOverheadImgs = _.cloneDeep(overheadImages);
                        updatedOverheadImgs.push(overheadImagesToAdd);
                    }
                    else{
                        updatedOverheadImgs.push(overheadImagesToAdd);
                    }

                    const updatedAllUserImages = await this.update(
                        {
                            wallImages: updatedWallImgs,
                            overheadImages: updatedOverheadImgs,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
                                uniqueId: unique,
                            },
                            transaction: t,
                        }
                    );
                    return updatedAllUserImages;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back updateAllUserImages", error);
            }
        }

        static async updateUserWallImages(userId, wallImagesToAdd, unique ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        unique,
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { wallImages } = user.dataValues;

                    let updatedWallImgs = [];
                    if(!_.isNil(wallImages) || !_.isEmpty(wallImages)){
                        updatedWallImgs = _.cloneDeep(wallImages);
                        updatedWallImgs.push(wallImagesToAdd);
                    }
                    else{
                        updatedWallImgs.push(wallImagesToAdd);
                    }
                    const updatedUserWallImgs = await this.update(
                        {
                            wallImages: updatedWallImgs,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
                                uniqueId: unique,
                            },
                            transaction: t,
                        }
                    );
                    return updatedUserWallImgs;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back updateUserWallImages", error);
            }
        }

        static async updateUserOverheadImages(userId, overheadImagesToAdd, unique ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        unique,
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { overheadImages } = user.dataValues;

                    let updatedOverheadImgs = [];
                    if(!_.isNil(overheadImages) || !_.isEmpty(overheadImages)){
                        updatedOverheadImgs = _.cloneDeep(overheadImages);
                        updatedOverheadImgs.push(overheadImagesToAdd);
                    }
                    else{
                        updatedOverheadImgs.push(overheadImagesToAdd);;
                    }
                    const updatedUserOverheadImgs = await this.update(
                        {
                            overheadImages: updatedOverheadImgs,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
                                uniqueId: unique,
                            },
                            transaction: t,
                        }
                    );
                    return updatedUserOverheadImgs;
                });
                // If the execution reaches this line, the transaction has been committed successfully
                // `result` is whatever was returned from the transaction callback (the `user`, in this case)
                return result;
            } catch (error) {
                console.log("Rolling back updateUserOverheadImages", error);
            }
        }

    };
    User.init({
        username: DataTypes.STRING,
        uniqueId: DataTypes.STRING,
        savedArt: DataTypes.ARRAY(DataTypes.STRING),
        overheadImages: DataTypes.ARRAY(DataTypes.STRING),
        wallImages: DataTypes.ARRAY(DataTypes.STRING),
    }, {
        sequelize,
        modelName: 'User',
        underscored: true
    });
    return User;
};
