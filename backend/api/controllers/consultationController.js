const Consultation = require('../models/Consultation');

async function getNextConsultationId() {
  const maxConsultation = await Consultation.findOne().sort({ consultation_id: -1 }).exec();
  const nextConsultationId = maxConsultation ? maxConsultation.consultation_id + 1 : 1;
  return nextConsultationId;
}

exports.createConsultation = async (req, res) => {
  try {
    const { payment_id, patient_id, doctor_id, date, description} = req.body;
    const consultation_id = await getNextConsultationId();
  
    const newConsultation = new Consultation({
      payment_id, 
      patient_id, 
      doctor_id, 
      date, 
      description
    });

    await newConsultation.save();
    res.status(201).json({ message: 'Konsultasi ', consultation: newConsultation });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ deleted: false });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Konsultasi tidak ditemukan' });
    res.status(200).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateConsultationPut = async (req, res) => {
//   try {
//     const { payment_id, patient_id, doctor_id, date, description } = req.body;
//     const consultation = await Consultation.findByIdAndUpdate(
//       req.params.id,
//       { payment_id, patient_id, doctor_id, date, description },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!consultation) return res.status(404).json({ message: 'Konsultasi tidak ditemukan' });
//     res.status(200).json(consultation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateConsultationPatch = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!consultation) return res.status(404).json({ message: 'Konsultasi tidak ditemukan' });
    res.status(200).json(consultation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteConsultation = async (req, res) => {
//   try {
//     const consultation = await Consultation.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!consultation) return res.status(404).json({ message: 'Konsultasi tidak ditemukan' });
//     res.status(200).json({ message: 'Konsultasi terhapus [soft deletion]', consultation });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Konsultasi tidak ditemukan' });
    res.status(200).json({ message: 'Konsultasi terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
