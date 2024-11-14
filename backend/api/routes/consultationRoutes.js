const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/', consultationController.createConsultation);
router.get('/', consultationController.getAllConsultations);
router.get('/:id', consultationController.getConsultationById);
// router.put('/:id', consultationController.updateConsultationPut);
router.patch('/:id', consultationController.updateConsultationPatch);
router.delete('/:id', consultationController.deleteConsultation);
// router.patch('/:id/sofdel', consultationController.softDeleteConsultation);

module.exports = router;