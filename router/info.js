const express = require('express')
const router = express.Router();
const userController = require("../controller/authcontroller");
const {checkToken} = require('../middlewares/middleware');





const db=require("../model");




/**
 * @swagger
 *  /sign-up:
 *      post:
 *          tags:
 *              -   Auth
 *          description: Signup
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *                              required: true,
 *                              example: "nithin"
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          password:
 *                              type: string,
 *                              required: true,
 *                              example: "123"                   
 *                          isAdmin:
 *                              type: boolean,
 *                              required: true,
 *                              example: "false"                   
 *          responses:
 *              200 :
 *                  description: login successfull
 *
 *
 */


router.post('/sign-up',userController.signUp);

/**
 * @swagger
 *  /login:
 *      post:
 *          tags:
 *              -   Auth
 *          description: Login
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              required: true,
 *                              example: "test@mailinator.com"
 *                          password:
 *                              type: string,
 *                              required: true,
 *                              example: "123"                   
 *          responses:
 *              200 :
 *                  description: login successfull
 *
 *
 */


router.post('/login',userController.login)

/**
  * @swagger
  *  /all-users:
  *      get:
  *          security:
  *              - Bearer: []
  *          tags:
  *              -   All users
  *          description: list all users                            
  *          responses:
  *              200 :
  *                  description: users listed
  *
  *
  */

 router.get('/all-users',checkToken,userController.allUsers)

 /**
  * @swagger
  *  /profile:
  *      get:
  *          security:
  *              - Bearer: []
  *          tags:
  *              -   Profile
  *          description: get profile details                            
  *          responses:
  *              200 :
  *                  description: get profile successfully
  *
  *
  */

 router.get('/profile/:id', checkToken, userController.getProfile)




  module.exports = {
    routes: router
}
