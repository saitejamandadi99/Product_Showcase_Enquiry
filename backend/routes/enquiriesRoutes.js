const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createEnquiry, getAllEnquiries} = require('../controllers/enquiriesController')


router.post('/', createEnquiry)
router.get('/',authMiddleware, getAllEnquiries)

module.exports = router