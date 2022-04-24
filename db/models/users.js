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

        static async createUser(userToCreate){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const newUser = this.build(userToCreate);
                    // newUser.savedArt = [];
                    // newUser.wallImages = [];
                    // newUser.overheadImages = [];

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

        static async getUserById(userId ){
            const user = await this.findOne({
                where:{
                    id: userId,
                }
            });
            return user;
        }

        static async addToUserSavedArt(userId, artToAdd){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        { transaction: t}
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { savedArt } = user.dataValues;

                    let updatedArt = [];

                    if((!_.isNil(savedArt) || !_.isEmpty(savedArt)) && !_.includes(savedArt, artToAdd)){
                        updatedArt = [...savedArt].concat([artToAdd]);
                    }
                    else if(!_.isNil(savedArt) || !_.isEmpty(savedArt)){
                        updatedArt = [artToAdd];
                    }

                    const updatedUserArt = await this.update(
                        {
                            savedArt: updatedArt,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
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

        static async removeFromUserSavedArt(userId, artToRemove){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        { transaction: t}
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

        static async updateAllUserImages(userId, wallImagesToAdd, overheadImagesToAdd ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        { transaction: t}
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }

                    const { wallImages, overheadImages } = user.dataValues;

                    let updatedWallImgs = [];
                    if(!_.isNil(wallImages) || !_.isEmpty(wallImages)){
                        updatedWallImgs = [...wallImages].concat(wallImagesToAdd);
                    }
                    else{
                        updatedWallImgs = wallImagesToAdd;
                    }

                    let updatedOverheadImgs = [];
                    if(!_.isNil(overheadImages) || !_.isEmpty(overheadImages)){
                        updatedOverheadImgs = [...overheadImages].concat(overheadImagesToAdd);
                    }
                    else{
                        updatedOverheadImgs = overheadImagesToAdd;
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

        static async updateUserWallImages(userId, userPhotos ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        { transaction: t}
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { wallImages } = user.dataValues;

                    let updatedWallImgs = [];
                    if(!_.isNil(wallImages) || !_.isEmpty(wallImages)){
                        updatedWallImgs = [...wallImages].concat(userPhotos);
                    }
                    else{
                        updatedWallImgs = userPhotos;
                    }
                    const updatedUserWallImgs = await this.update(
                        {
                            wallImages: updatedWallImgs,
                        },
                        {
                            returning: true,
                            where: {
                                id: userId,
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

        static async updateUserOverheadImages(userId, userPhotos ){
            try {
                const result = await sequelize.transaction(async (t) => {

                    const user = await this.getUserById(
                        userId,
                        { transaction: t}
                    );
                    if(_.isEmpty(user)){
                        throw new Error('UserId has null or undefined id');
                    }
                    const { overheadImages } = user.dataValues;

                    let updatedOverheadImgs = [];
                    if(!_.isNil(overheadImages) || !_.isEmpty(overheadImages)){
                        updatedOverheadImgs = [...overheadImages].concat(userPhotos);
                    }
                    else{
                        updatedOverheadImgs = userPhotos;
                    }
                    const updatedUserOverheadImgs = await this.update(
                        {
                            wallImages: updatedOverheadImgs,
                        },
                        {
                            where: {
                                id: userId,
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
