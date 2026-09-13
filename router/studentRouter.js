const express = require("express");
const Student = require("../model/studentModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    const safeStudent = student.toObject();
    delete safeStudent.password;

    return res.status(201).json({
      message: "Student registered successfully",
      student: safeStudent,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Student email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Student registration data is invalid",
        errors: Object.values(error.errors).map((item) => item.message),
      });
    }

    console.error("Student registration failed:", error.message);
    return res.status(500).json({ message: "Unable to register student" });
  }
});

module.exports = router;
