// src/app/api/logout/route.js
import { NextResponse } from 'next/server';
import { destroyCookie } from 'nookies';

export async function POST(req) {
    try {
        // Elimina las cookies del lado del servidor
        destroyCookie({ res: NextResponse.next() }, 'refresh-token', { path: '/' });
        destroyCookie({ res: NextResponse.next() }, 'token', { path: '/' });

        return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error logging out', error: error.message }, { status: 500 });
    }
}
