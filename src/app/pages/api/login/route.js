// /pages/api/login.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // const { email, password } = req.body;
        const email = "ismacorporation@gmail.com";
        const password = "123456";

        const loginUrl = "https://mister.mundodeportivo.com/api2/auth/email";
        const payload = { email, password };
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.123 Safari/537.36',
        };

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.token) {
                console.log(`Autenticación exitosa. Token de sesión: ${data.token}`);
                // Envía el token al cliente o maneja como necesites
                res.status(200).json({ token: data.token });
            } else {
                throw new Error("Token not found in response");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
