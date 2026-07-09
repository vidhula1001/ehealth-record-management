const express = require("express");
const multer = require("multer");
const uploadFile = require("../utils/uploadBlob");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {

    try {

        const fileUrl = await uploadFile(
            req.file.originalname,
            req.file.buffer
        );

        res.json({
            success: true,
            url: fileUrl
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;