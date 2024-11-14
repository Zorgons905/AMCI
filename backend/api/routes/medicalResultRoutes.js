const express = require('express');
const router = express.Router();
const medicalResultController = require('../controllers/medicalResultController');

router.post('/', medicalResultController.createMedicalResult);
router.get('/', medicalResultController.getAllMedicalResults);
router.get('/:id', medicalResultController.getMedicalResultById);
// router.put('/:id', medicalResultController.updateMedicalResultPut);
router.patch('/:id', medicalResultController.updateMedicalResultPatch);
router.delete('/:id', medicalResultController.deleteMedicalResult);
// router.patch('/:id/sofdel', medicalResultController.softDeleteMedicalResult);

module.exports = router;
