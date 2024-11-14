const Specialization = require('../models/Specialization');

async function getNextSpecializationId() {
  const maxSpecialization = await Specialization.findOne().sort({ specialization_id: -1 }).exec();
  const nextSpecializationId = maxSpecialization ? maxSpecialization.specialization_id + 1 : 1;
  return nextSpecializationId;
}

exports.createSpecialization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const specialization_id = await getNextSpecializationId();
  
    const newSpecialization = new Specialization({
      specialization_id,
      name,
      description, 
    });
    await newSpecialization.save();
    res.status(201).json({ message: 'Spesialisasi berhasil ditemukan', specialization: newSpecialization });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find({ deleted: false });
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecializationById = async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) return res.status(404).json({ message: 'Spesialisasi tidak ditemukan' });
    res.status(200).json(specialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSpecializationPut = async (req, res) => {
  try {
    const { name, specialist, telp, email } = req.body;
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      { name, specialist, telp, email },
      { new: true, runValidators: true, overwrite: true }
    );
    if (!specialization) return res.status(404).json({ message: 'Spesialisasi tidak ditemukan' });
    res.status(200).json(specialization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSpecializationPatch = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!specialization) return res.status(404).json({ message: 'Spesialisasi tidak ditemukan' });
    res.status(200).json(specialization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteSpecialization = async (req, res) => {
//   try {
//     const specialization = await Specialization.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!specialization) return res.status(404).json({ message: 'Specialization not found' });
//     res.status(200).json({ message: 'Specialization soft deleted successfully', specialization });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndDelete(req.params.id);
    if (!specialization) return res.status(404).json({ message: 'Spesialisasi tidak ditemukan' });
    res.status(200).json({ message: 'Spesialisasi terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};