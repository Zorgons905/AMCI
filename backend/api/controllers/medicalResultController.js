const MedicalResult = require('../models/MedicalResult');

async function getNextResultId() {
  const maxResult = await Result.findOne().sort({ result_id: -1 }).exec();
  const nextResultId = maxResult ? maxResult.result_id + 1 : 1;
  return nextResultId;
}

exports.createMedicalResult = async (req, res) => {
  try {
    const { patient_id, doctor_id, hospital_id, date_of_test, test_type, test_results, notes } = req.body;
    const result_id = await getNextResultId();
  
    const newResult = new Result({
      result_id,
      patient_id,
      doctor_id, 
      hospital_id, 
      date_of_test, 
      test_type, 
      test_results, 
      notes
    });

    await newResult.save();
    res.status(201).json({ message: 'Hasil Medis berhasil dibuat', result: newResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMedicalResults = async (req, res) => {
  try {
    const results = await MedicalResult.find({ deleted: false });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicalResultById = async (req, res) => {
  try {
    const result = await MedicalResult.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Hasil Medis tidak ditemukan' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateMedicalResultPut = async (req, res) => {
//   try {
//     const { payment_id, patient_id, doctor_id, date, description } = req.body;
//     const result = await MedicalResult.findByIdAndUpdate(
//       req.params.id,
//       { payment_id, patient_id, doctor_id, date, description },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!result) return res.status(404).json({ message: 'Hasil Medis tidak ditemukan' });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateMedicalResultPatch = async (req, res) => {
  try {
    const result = await MedicalResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) return res.status(404).json({ message: 'Hasil Medis tidak ditemukan' });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteMedicalResult = async (req, res) => {
//   try {
//     const result = await MedicalResult.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!result) return res.status(404).json({ message: 'Hasil Medis tidak ditemukan' });
//     res.status(200).json({ message: 'Hasil Medis terhapus [soft deletion]', result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteMedicalResult = async (req, res) => {
  try {
    const result = await MedicalResult.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Hasil Medis tidak ditemukan' });
    res.status(200).json({ message: 'Hasil Medis terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
