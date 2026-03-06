import jwt from 'jsonwebtoken';
import connectDB from './db';
import User from './models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export function signToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function verifyAuth(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        await connectDB();
        const user = await User.findById(decoded.id).select('-password');
        return user;
    } catch {
        return null;
    }
}

export async function requireAuth(request) {
    const user = await verifyAuth(request);
    if (!user) {
        return { error: Response.json({ message: 'Unauthorized' }, { status: 401 }) };
    }
    return { user };
}

export async function requireAdmin(request) {
    const result = await requireAuth(request);
    if (result.error) return result;
    if (result.user.role !== 'admin') {
        return { error: Response.json({ message: 'Admin access required' }, { status: 403 }) };
    }
    return result;
}
