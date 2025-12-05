const express = require('express')
const router = express.Router()
const {createEnquiry, getAllEnquiries} = require('../controllers/enquiriesController')

router.post('/', createEnquiry)
router.get('/', getAllEnquiries)

module.exports = router