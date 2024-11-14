const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');
const User = require('../models/User');

async function getNextUserId() {
  const maxUser = await User.findOne().sort({ user_id: -1 }).exec();
  const nextUserId = maxUser ? maxUser.user_id + 1 : 1;
  return nextUserId;
}

exports.createPatient = async (req, res) => {
  try {
    const { email, password, name, born_date, gender, address, contact_number, medical_history, height, weight } = req.body;
    const user_id = await getNextUserId();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      user_id,
      email,
      password: hashedPassword,
      role: 'patient',
    });

    await newUser.save();

    const newPatient = new Patient({
      user_id,
      name,
      born_date,
      gender,
      address,
      contact_number,
      email,
      medical_history,
      height,
      weight
    });

    await newPatient.save();

    res.status(201).json({
      message: 'Pasien dan User berhasil dibuat',
      patient: newPatient,
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ deleted: false });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Pasien tidak ditemukan' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updatePatientPut = async (req, res) => {
//   try {
//     const { payment_id, patient_id, doctor_id, date, description } = req.body;
//     const patient = await Patient.findByIdAndUpdate(
//       req.params.id,
//       { payment_id, patient_id, doctor_id, date, description },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!patient) return res.status(404).json({ message: 'Pasien tidak ditemukan' });
//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updatePatientPatch = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!patient) return res.status(404).json({ message: 'Pasien tidak ditemukan' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeletePatient = async (req, res) => {
//   try {
//     const patient = await Patient.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!patient) return res.status(404).json({ message: 'Pasien tidak ditemukan' });
//     res.status(200).json({ message: 'Pasien terhapus [soft deletion]', patient });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Pasien tidak ditemukan' });
    res.status(200).json({ message: 'Pasien terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
