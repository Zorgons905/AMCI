const Payment = require('../models/Payment');

async function getNextPaymentId() {
  const maxPayment = await Payment.findOne().sort({ payment_id: -1 }).exec();
  const nextPaymentId = maxPayment ? maxPayment.payment_id + 1 : 1;
  return nextPaymentId;
}

exports.createPayment = async (req, res) => {
  try {
    const { patient_id, hospital_id, date, description } = req.body;
    const payment_id = await getNextPaymentId();
  
    const newPayment = new Payment({
      payment_id,
      patient_id,
      hospital_id,
      date,
      description,
    });
    await newPayment.save();
    res.status(201).json({ message: 'Pembayaran berhasil dibuat', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ deleted: false });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updatePaymentPut = async (req, res) => {
//   try {
//     const { name, specialist, telp, email } = req.body;
//     const payment = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { name, specialist, telp, email },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });
//     res.status(200).json(payment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updatePaymentPatch = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeletePayment = async (req, res) => {
//   try {
//     const payment = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });
//     res.status(200).json({ message: 'Payment soft deleted successfully', payment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    res.status(200).json({ message: 'Pembayaran terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
