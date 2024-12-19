// src/app/api/progression/route.js

import axios from 'axios';

export const GET = async () => {
    try {
        // Realizar la solicitud POST al endpoint
        const response = await axios.get('https://mister.mundodeportivo.com/api2/competitions');

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
