const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);
const patientRoutes = require('./routes/patients');
const recordRoutes = require('./routes/records');
const uploadRoutes = require("./routes/upload");
app.use('/api/patients', patientRoutes);
app.use('/api/records', recordRoutes);

app.get('/', (req, res) => res.send('EHealth API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));