import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'fa-graduation-cap' },
    color: { type: String, default: 'from-brand-500 to-brand-600' },
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model('Department', departmentSchema);
