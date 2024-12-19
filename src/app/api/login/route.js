// src/app/api/login/route.js

import axios from 'axios';
import cookie from 'cookie';

export const POST = async (req) => {
    try {
        const { email, password } = await req.json();

        const login_url = "https://mister.mundodeportivo.com/api2/auth/email";
        const payload = { email, password };
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.123 Safari/537.36',
        };

        // Realizar la solicitud POST para autenticarse
        const response = await axios.post(login_url, payload, { headers });

        if (response.status === 200) {
            // Obtener el token de sesión de la respuesta
            const token = response.data.token;

            // Realizamos la segunda solicitud para verificar que el token sea válido
            const url = "https://mister.mundodeportivo.com/api2/auth/external/exchange-token";
            const tokenPayload = { token };
            const verifyResponse = await axios.post(url, tokenPayload, { headers });

            if (verifyResponse.status === 200) {
                const setCookieHeaders = verifyResponse.headers['set-cookie'];

                let refreshToken = '';
                let verifiedToken = '';

                // Extraer las cookies del encabezado 'set-cookie'
                setCookieHeaders.forEach(cookieStr => {
                    if (cookieStr.startsWith('refresh-token=')) {
                        refreshToken = cookieStr.split(';')[0].split('=')[1];
                    } else if (cookieStr.startsWith('token=')) {
                        verifiedToken = cookieStr.split(';')[0].split('=')[1];
                    }
                });

                console.log(refreshToken, verifiedToken);
                console.log(typeof refreshToken, typeof verifiedToken, typeof token)

                // Guardamos las cookies (refresh-token y token) en el cliente
                const refreshTokenCookie = cookie.serialize('refresh-token', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7, // 1 semana
                });

                const tokenCookie = cookie.serialize('token', verifiedToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7, // 1 semana
                });

                return new Response(JSON.stringify({ message: 'Token válido' }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Set-Cookie': [refreshTokenCookie, tokenCookie],

                    },
                });
            } else {
                return new Response(JSON.stringify({ message: 'Token inválido', error: verifyResponse.data }), {
                    status: verifyResponse.status,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        } else {
            return new Response(JSON.stringify({ message: 'Autenticación fallida', error: response.data }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        if (error.response) {
            // Error de respuesta de la API externa
            return new Response(JSON.stringify({ message: 'Error de autenticación', error: error.response.data }), {
                status: error.response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // Otro tipo de error
            return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
};
