/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: For user registration
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *         properties:
 *          name:
 *           type: string
 *           example: John Doe
 *          email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 */

const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
