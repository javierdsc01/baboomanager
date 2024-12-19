import axios from 'axios';

export const POST = async (req) => {
    try {
        // Obtener el token y refresh-token de las cookies
        const token = req.headers.get('Cookie').split(';').find(cookie => cookie.includes('token')).split('=')[1];
        const refreshToken = req.headers.get('Cookie').split(';').find(cookie => cookie.includes('refresh-token')).split('=')[1];

        if (!token) {
            return new Response(JSON.stringify({ message: 'No autorizado: Token faltante' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        if (!refreshToken) {
            return new Response(JSON.stringify({ message: 'No autorizado: Refresh Token faltante' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }


        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.123 Safari/537.36',
            'X-Auth': '6baca5339d20a40b459ad851692e643f',
            'Cookie': `refresh-token=${refreshToken}; token=${token};`,
        };

        // Realizar la solicitud POST al endpoint
        const response = await axios.post('https://mister.mundodeportivo.com/ajax/balance', {}, { headers });

        if (response.status === 200) {
            return new Response(JSON.stringify({ message: 'Solicitud exitosa', data: response.data }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Error en la solicitud', error: response.data }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        if (error.response) {
            return new Response(JSON.stringify({ message: 'Error en la solicitud', error: error.response.data }), {
                status: error.response.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
};
