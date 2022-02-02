const express = require(`express`);
const articleController = require(`../controlers/article`);
const verify = require(`../routes/verifyToken`);
const router = express.Router();
const {asyncHandler} = require("../middlewares/auth")
/**
 * @openapi
 * tags:
 *  name: Blog
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          description: Every post must have title
 *        description:
 *          type: string
 *          description: This holds the content of the post.
 *      example:
 *        title: My post
 *        snippet: lemme post my self
 *        body: This is content of my post
 */

router.post("/", asyncHandler(articleController.articleController));

router.get("/", asyncHandler(articleController.getArticles));
router.get("/:id",asyncHandler (articleController.getArticle));
router.put("/:id", verify, asyncHandler(articleController.updateArticle));
router.delete("/:id", verify, asyncHandler(articleController.deleteArticle));

module.exports = router;
