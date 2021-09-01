'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
       notNull:{
         msg:"A name is required",
       },
       notEmpty:{
         msg: "Please provide a name",
       }
      }
    },
    email: {
      type: DataTypes.STRING,
            allowNull: false,
            validate:{
       notNull:{
         msg:"An email is required",
       },
       isEmail:{
         msg: "Please provide a valid email address",
       }
        
      }
    
    },
    birthday: {
      type: DataTypes.DATEONLY,
            allowNull: false,
             validate:{
       notNull:{
         msg:"Birthday is required",
       },
       notEmpty:{
         msg: "Please provide a birth date",
       }
      }

    },
    password: {
      type: DataTypes.STRING,
            allowNull: false,
             validate:{
       notNull:{
         msg:"Password is required",
       },
        notEmpty:{
         msg: "Please provide a password",
       }
      }

    }
  }, { sequelize });

  return User;
};