const express = require('express');
const router = express.Router();
const specializationController = require('../controllers/specializationController');

router.post('/', specializationController.createSpecialization);
router.get('/', specializationController.getAllSpecializations);
router.get('/:id', specializationController.getSpecializationById);
// router.put('/:id', specializationController.updateSpecializationPut);
router.patch('/:id', specializationController.updateSpecializationPatch);
router.delete('/:id', specializationController.deleteSpecialization);
// router.patch('/:id/sofdel', specializationController.softDeleteSpecialization);

module.exports = router;
