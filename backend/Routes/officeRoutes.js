const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const Office = require("../models/officeModel");

// Validation middleware for the POST and PUT requests
const validateOffice = [
  body("displayName").notEmpty().withMessage("Display Name is required"),
  body("location.address").notEmpty().withMessage("Address is required"),
  body("location.city").notEmpty().withMessage("City is required"),
  body("location.state").notEmpty().withMessage("State is required"),
  body("location.zipCode").notEmpty().withMessage("Zip Code is required"),
  body("workEnvironment").notEmpty().withMessage("Work Environment is required"),
  body("workSchedule").isArray().withMessage("Work Schedule must be an array"),
];

route.get("/", async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific office
route.get("/:id", async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.json(office);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new office
route.post("/", validateOffice, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const office = new Office(req.body);
  try {
    const newOffice = await office.save();
    res.status(201).json(newOffice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing office
route.put("/:id", validateOffice, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOffice) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json({
      message: "Office Updated successfully",
      updatedOffice,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an office
route.delete("/:id", async (req, res) => {
  try {
    const deletedOffice = await Office.findByIdAndDelete(req.params.id);
    if (!deletedOffice) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.json({ message: "Office deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
