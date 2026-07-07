const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// Get records for a patient
router.get('/patient/:patientId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('patientId', sql.Int, req.params.patientId)
            .query('SELECT * FROM MedicalRecords WHERE PatientID=@patientId ORDER BY VisitDate DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add new record
router.post('/', async (req, res) => {
    const { patientId, doctorId, diagnosis, prescription, notes } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('patientId', sql.Int, patientId)
            .input('doctorId', sql.Int, doctorId)
            .input('diagnosis', sql.NVarChar, diagnosis)
            .input('prescription', sql.NVarChar, prescription)
            .input('notes', sql.NVarChar, notes)
            .query(`INSERT INTO MedicalRecords (PatientID, DoctorID, Diagnosis, Prescription, Notes)
                    VALUES (@patientId, @doctorId, @diagnosis, @prescription, @notes)`);
        res.status(201).send('Record added');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;