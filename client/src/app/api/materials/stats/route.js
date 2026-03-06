import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import StudyMaterial from '@/lib/models/StudyMaterial';
import Bookmark from '@/lib/models/Bookmark';

export async function GET() {
    try {
        await connectDB();
        const totalMaterials = await StudyMaterial.countDocuments();
        const totalDownloads = await StudyMaterial.aggregate([
            { $group: { _id: null, total: { $sum: '$downloadCount' } } },
        ]);
        const totalDepartments = (await StudyMaterial.distinct('department')).length;
        const totalBookmarks = await Bookmark.countDocuments();

        return NextResponse.json({
            totalMaterials,
            totalDownloads: totalDownloads[0]?.total || 0,
            totalDepartments,
            totalBookmarks,
        });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
