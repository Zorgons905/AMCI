const bcrypt = require('bcrypt');
const Hospital = require('../models/Hospital');
const User = require('../models/User');

async function getNextUserId() {
  const maxUser = await User.findOne().sort({ user_id: -1 }).exec();
  const nextUserId = maxUser ? maxUser.user_id + 1 : 1;
  return nextUserId;
}

exports.createHospital = async (req, res) => {
  try {
    const {hospital_id, name, address, contact_number, email, password} = req.body;
    const user_id = await getNextUserId();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      user_id,
      email,
      password: hashedPassword,
      role: 'hospital',
    });

    await newUser.save();

    const newHospital = new Hospital({
      user_id,
      hospital_id,
      name,
      address,
      contact_number,
      email
    });

    await newHospital.save();

    res.status(201).json({
      message: 'Hospital and User account created successfully',
      hospital: newHospital,
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateHospitalPut = async (req, res) => {
//   try {
//     const { name, address, email } = req.body;
//     const hospital = await Hospital.findByIdAndUpdate(
//       req.params.id,
//       { name, address, email },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
//     res.status(200).json(hospital);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateHospitalPatch = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteHospital = async (req, res) => {
//   try {
//     const hospital = await Hospital.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
//     res.status(200).json({ message: 'Hospital soft deleted successfully', hospital });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json({ message: 'Hospital terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
