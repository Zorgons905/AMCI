const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUserPut);
router.patch('/:id', userController.updateUserPatch);
router.delete('/:id', userController.deleteUser);
// router.patch('/:id/sofdel', userController.softDeleteUser);

module.exports = router;
