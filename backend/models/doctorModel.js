import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, default: "Not specified" },
    experience: { type: String, required: true },
    about: { type: String, default: "Not specified" },
    available: { type: Boolean, default: true },
    fees: { type: Number, default: 0 },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, default: { line1: "", line2: "" } },
    phone: { type: String, default: "" },
    clinicName: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    certificate: { type: String, default: "" },
    role: { type: String, default: "doctor" },
    isVerified: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
    date: { type: Number, required: true },
}, { minimize: false })

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;