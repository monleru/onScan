const mongoose = require('mongoose')
const {Router} = require('express')
const postController = require('./postController.js')
const router = Router()

router.get('/buyrub', postController.buyrub )
router.get('/bigpapa', postController.update )

module.exports = router;