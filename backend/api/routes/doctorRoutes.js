const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
// router.put('/:id', doctorController.updateDoctorPut);
router.patch('/:id', doctorController.updateDoctorPatch);
router.delete('/:id', doctorController.deleteDoctor);
// router.patch('/:id/sofdel', doctorController.softDeleteDoctor);

module.exports = router;
