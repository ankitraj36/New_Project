import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    subject: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, enum: ['PDF', 'PPT', 'DOCX', 'Textbook', 'Lab Manual'], default: 'PDF' },
    size: { type: String, default: '' },
    fileURL: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

studyMaterialSchema.index({ title: 'text', subject: 'text', description: 'text' });

export default mongoose.models.StudyMaterial || mongoose.model('StudyMaterial', studyMaterialSchema);
