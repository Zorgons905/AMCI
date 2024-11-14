require('dotenv').config()
require('./config/database');

const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:8080'}));

const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const medicalResultRoutes = require('./routes/medicalResultRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

app.use('/users', userRoutes);
app.use('/patients', patientRoutes);
app.use('/notifications', notificationRoutes);
app.use('/medical_results', medicalResultRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/payments', paymentRoutes);
app.use('/consultations', consultationRoutes);
app.use('/doctors', doctorRoutes);

app.get('/', (req, res) => {
    res.send('Selamat Datang di API PT Budi Jaya!');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
