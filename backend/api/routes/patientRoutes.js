const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
// router.put('/:id', patientController.updatePatientPut);
router.patch('/:id', patientController.updatePatientPatch);
router.delete('/:id', patientController.deletePatient);
// router.patch('/:id/sofdel', patientController.softDeletePatient);

module.exports = router;
