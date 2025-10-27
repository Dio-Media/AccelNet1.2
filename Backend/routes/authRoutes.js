const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.post('/login', controller.authenticateUser);
router.post('/register', controller.addCustomer);
router.post('/decode', controller.decodeToken);
router.post('/firstname', controller.getFirstName);

module.exports = router;