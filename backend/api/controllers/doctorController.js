const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

async function getNextUserId() {
  const maxUser = await User.findOne().sort({ user_id: -1 }).exec();
  const nextUserId = maxUser ? maxUser.user_id + 1 : 1;
  return nextUserId;
}

exports.createDoctor = async (req, res) => {
  try {
    const {doctor_id, name, specialist, contact_number, email, password} = req.body;
    const user_id = await getNextUserId();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      user_id,
      email,
      password: hashedPassword,
      role: 'doctor',
    });

    await newUser.save();

    const newDoctor = new Doctor({
      user_id,
      doctor_id,
      name,
      specialist,
      contact_number,
      email
    });

    await newDoctor.save();

    res.status(201).json({
      message: 'Dokter dan User berhasil dibuat',
      doctor: newDoctor,
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ deleted: false });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateDoctorPut = async (req, res) => {
//   try {
//     const { name, specialist, telp, email } = req.body;
//     const doctor = await Doctor.findByIdAndUpdate(
//       req.params.id,
//       { name, specialist, telp, email },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateDoctorPatch = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doctor) return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
//     res.status(200).json({ message: 'Doctor soft deleted successfully', doctor });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    res.status(200).json({ message: 'Dokter terhapus permanen'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
