import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import StudyMaterial from '@/lib/models/StudyMaterial';
import Bookmark from '@/lib/models/Bookmark';
import Department from '@/lib/models/Department';
import { requireAdmin } from '@/lib/authHelper';

export async function GET(request) {
    try {
        await connectDB();
        const { user, error } = await requireAdmin(request);
        if (error) return error;

        const totalUsers = await User.countDocuments();
        const totalMaterials = await StudyMaterial.countDocuments();
        const totalBookmarks = await Bookmark.countDocuments();
        const totalDepartments = await Department.countDocuments();
        const totalDownloads = await StudyMaterial.aggregate([
            { $group: { _id: null, total: { $sum: '$downloadCount' } } },
        ]);

        const recentMaterials = await StudyMaterial.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            totalUsers,
            totalMaterials,
            totalBookmarks,
            totalDepartments,
            totalDownloads: totalDownloads[0]?.total || 0,
            recentMaterials,
            recentUsers,
        });
    } catch {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
