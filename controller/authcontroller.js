const config = require("../config/auth.config");
const db=require("../model")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto")



const fs = require('fs')
const express=require("express")
const app=express()
const path=require("path");







const User=db.user







module.exports = {



    signUp: async (req, res) => {
      try {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const users = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          //roleId: req.body.isAdmin ? 2 : 3,
        };
       
        const result = await db.user.create(users);

        
        
        return res.status(200).json({
          success: true,
          message: "user created Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    }
    ,
  
    
    login: async (req, res,next) => {
   
    try {
      const user = await db.user.findOne( { email: req.body.email } );
     
      
      if (!user) {
        res.status(401).json({
          message: "No User Found",

        });
       
      } else {
        
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              "secret"
            );
          
           res.status(200).json({
              success: true,
              message: "authentication successfull",
              
              token: token,
            });
            
           
      
          }
          
          else {
            res.status(401).json({
              success: false,
              message: "invalid credentials",
            });
          }
        
        });
      
      }
    
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
},
allUsers: async (req, res) => {
    try {

     
      
      const usersList = await db.user.find();
  
      return res.status(200).json({
        success: true,
        message: usersList,

      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    
  }
  ,
    
    
  getProfile: async (req, res) => {
    try {
      
        const profile=await db.user.findOne({_id:req.params.id})
  
      return res.status(200).json({
        success: true,
        message: "get user profile successfully",
        data: req.user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  
  }
  
}