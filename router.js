const mongoose = require('mongoose')
const {Router} = require('express')
const postController = require('./postController.js')
const router = Router()

router.post('/posts', postController.create )
router.get('/binance-price', postController.getPriceBinance )
router.get('/houbi-price', postController.getHuobi)
router.get('/posts/:id',postController.getOne )
router.put('/posts', postController.update )
router.delete('/posts/:id',postController.delete )
router.get('/collections',postController.collections)
router.get('/search',postController.search)
router.post('/login',postController.login)
router.post('/getToken',postController.getToken)

module.exports = router;