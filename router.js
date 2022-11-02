const mongoose = require('mongoose')
const {Router} = require('express')
const postController = require('./postController.js')
const router = Router()

router.get('/buyrub', postController.buyrub )
router.get('/corona', postController.corona )
router.get('/bigpapa', postController.update )
router.get('/pars', postController.pars )


module.exports = router;