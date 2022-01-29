const express = require(`express`);
const { verify } = require("jsonwebtoken");
const userController = require(`../controlers/user`);
const { asyncHandler } = require("../middlewares/auth");
const router = express.Router();
/**
 * @openapi
 * tags:
 *  name: User
 *  description: APIs for the user
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        full_name:
 *          type: string
 *          description: Every user must provide a name
 *        email:
 *          type: string
 *          description: email must be provided
 *        password:
 *          type: string
 *          description: Also provide your password.
 *      example:
 *        full_name: Noella
 *        email: me@gmail.com
 *        password: Me1234
 */

/**
 * @swagger
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access need Token
 */
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginInfo:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: an email must be valid
 *              password:
 *                  type: string
 *                  description: password required.
 *          example:
 *            email: me@gmail.com
 *            password: Me1234
 */

/**
 * @swagger
 * /users/signup:
 *  post:
 *    summary: A user can make registration
 *    description: both name, email and password must be provided
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *
 *    responses:
 *      200:
 *        description: Successfully registered.
 *        content:
 *          application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *
 *      400:
 *        description: Invalid input or Bad formated input
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                code:
 *                  type: number
 */

router.post(`/signup`, asyncHandler(userController.userController));
/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: A user must sign-in with his/her credentials
 *    description: A user must provide a valid email and password to login
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginInfo'
 *    responses:
 *      200:
 *        description: Logged-in successfully!, keep your Token
 *      400:
 *        description: Invalid userName or password!
 *      404:
 *        description: Email is not found!
 */

router.post(`/login`, asyncHandler(userController.userloginController));
router.get(`/user`, verify, asyncHandler(userController.getusers));

router.get(`/:_id`, verify, asyncHandler(userController.getuser));

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    security:
 *      - Token: []
 *    summary: you can update your profile
 *    description: you need a valid Token to update your profile
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        description: use a Valid Id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully updated
 *      500:
 *        description: Internal error!
 */
router.put(`/:_id`, verify, asyncHandler(userController.updateUser));

router.delete(`/:_id`, verify, asyncHandler(userController.deleteUser));

module.exports = router;
