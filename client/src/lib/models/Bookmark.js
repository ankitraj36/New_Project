import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyMaterial', required: true },
}, { timestamps: true });

bookmarkSchema.index({ userId: 1, materialId: 1 }, { unique: true });

export default mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);
