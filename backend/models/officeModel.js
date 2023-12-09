const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  isHeadquarter: { type: Boolean, default: false },
  workEnvironment: { type: String, required: true },
  workSchedule: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  employees: [
    {
      name: { type: String, required: true },
      position: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  ],
  amenities: [
    {
      name: { type: String, required: true },
      description: { type: String },
    },
  ],
  contactPerson: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  annualHolidays: [
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  // Other details as needed
});

const Office = new mongoose.model("Office", officeSchema);

module.exports = Office;
