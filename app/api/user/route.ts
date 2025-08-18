import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserData } from '@/lib/actions/GetUserData'; // Update this path

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await getUserData(userId);
    
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      username: userData.username,
      avatarUrl: userData.avatar,
      // Include any other fields you need in the frontend
    });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}