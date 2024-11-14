const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/', hospitalController.createHospital);
router.get('/', hospitalController.getAllHospitals);
router.get('/:id', hospitalController.getHospitalById);
// router.put('/:id', hospitalController.updateHospitalPut);
router.patch('/:id', hospitalController.updateHospitalPatch);
router.delete('/:id', hospitalController.deleteHospital);
// router.patch('/:id/sofdel', hospitalController.softDeleteHospital);

module.exports = router;
