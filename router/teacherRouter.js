const express = require("express");
const Teacher = require("../model/teacherModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    const safeTeacher = teacher.toObject();
    delete safeTeacher.password;

    return res.status(201).json({
      message: "Teacher registered successfully",
      teacher: safeTeacher,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Teacher email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Teacher registration data is invalid",
        errors: Object.values(error.errors).map((item) => item.message),
      });
    }

    console.error("Teacher registration failed:", error.message);
    return res.status(500).json({ message: "Unable to register teacher" });
  }
});

module.exports = router;
