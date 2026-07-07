const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Patients');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get single patient
router.get('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Patients WHERE PatientID = @id');
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add new patient
router.post('/', async (req, res) => {
    const { name, dob, gender, contactNumber, address } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('dob', sql.Date, dob)
            .input('gender', sql.NVarChar, gender)
            .input('contactNumber', sql.NVarChar, contactNumber)
            .input('address', sql.NVarChar, address)
            .query(`INSERT INTO Patients (Name, DOB, Gender, ContactNumber, Address)
                    VALUES (@name, @dob, @gender, @contactNumber, @address)`);
        res.status(201).send('Patient added');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update patient
router.put('/:id', async (req, res) => {
    const { name, dob, gender, contactNumber, address } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('name', sql.NVarChar, name)
            .input('dob', sql.Date, dob)
            .input('gender', sql.NVarChar, gender)
            .input('contactNumber', sql.NVarChar, contactNumber)
            .input('address', sql.NVarChar, address)
            .query(`UPDATE Patients SET Name=@name, DOB=@dob, Gender=@gender,
                    ContactNumber=@contactNumber, Address=@address WHERE PatientID=@id`);
        res.send('Patient updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete patient
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Patients WHERE PatientID=@id');
        res.send('Patient deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;