import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { act } from 'react';

export const GET = async (req) => {
    try {
        // Obtener el token y refresh-token de las cookies
        const token = req.headers.get('cookie').split(';').find(cookie => cookie.includes('token')).split('=')[1];
        const refreshToken = req.headers.get('cookie').split(';').find(cookie => cookie.includes('refresh-token')).split('=')[1];

        // Define la URL y los headers
        const url = 'https://mister.mundodeportivo.com/team';
        const headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "es-ES,es;q=0.9",
            "cache-control": "max-age=0",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "Referer": "https://mister.mundodeportivo.com/feed",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Cookie": `refresh-token=${refreshToken}; token=${token};`,
        };

        // Inicia Puppeteer y abre la página con los headers personalizados
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setExtraHTTPHeaders(headers);

        // Ve a la página deseada
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Evalúa y extrae los datos necesarios
        const playerList = await page.evaluate(() => {
            const players = Array.from(document.querySelectorAll('.player-list li'));
            return players.map(player => {
                const id = player.id.split('-')[1];
                const seller = player.className.split('-')[1];
                const name = player.querySelector('.name')?.innerText.trim();
                const priceText = player.querySelector('.underName')?.innerText.replace('↓', '').replace('↑', '').trim();
                const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10); // Convertir a número entero
                const points = player.querySelector('.points')?.innerText.trim();
                const image = player.querySelector('.player-pic img')?.getAttribute('src');
                const active = player.querySelector('.btn-sale')?.getAttribute('data-active') === '1';
                return {
                    id,
                    seller,
                    name,
                    price,
                    points,
                    image,
                    active
                };
            });
        });

        await browser.close();

        return NextResponse.json(playerList);
    } catch (error) {
        console.error('Error fetching the data', error);
        return NextResponse.json({ error: 'Error fetching the data' }, { status: 500 });
    }
};
