'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
      unique:{
        msg: "The email you enetered already exist"
      },
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
       isDate:{
         msg: "Please provide a valid birth date",
       }
      }

    },
    password: {
      type: DataTypes.VIRTUAL,
            allowNull: false,
             validate:{
       notNull:{
         msg:"Password is required",
       },
        notEmpty:{
         msg: "Please provide a password",
       },
       len:{
         args:[8,20],
         msg: "password should be between 8 and 20 characters"
       }
      }

    },
    confirmPassword:{
      type:DataTypes.STRING,
      allowNull:false,
      set(val){
    if(val === this.password){
    const hashedPassword = bcrypt.hashSync(val, 10);
    this.setDataValue('confirmPassword', hashedPassword);
    }
          },
          validate:{
            notNull:{
              msg: "Password must match"
            }
          }
        }
      }, { sequelize });

      return User;
};