/**
 * @swagger
 * /sample:
 *   get:
 *     summary: This is just a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */
const express = require('express');
const router = express.Router();

router.get('/sample', (req, res) => {
  res.json({ message: 'This is a sample message' });
});

module.exports = router;