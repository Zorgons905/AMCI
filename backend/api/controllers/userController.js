const User = require('../models/User');

async function getNextUserId() {
  const maxUser = await User.findOne().sort({ user_id: -1 }).exec();
  const nextUserId = maxUser ? maxUser.user_id + 1 : 1;
  return nextUserId;
}

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user_id = await getNextUserId();
  
    const newUser = new User({
      user_id,
      email,
      password,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'User berhasil dibuat', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateUserPut = async (req, res) => {
//   try {
//     const { name, specialist, telp, email } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, specialist, telp, email },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateUserPatch = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User soft deleted successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.status(200).json({ message: 'User terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
