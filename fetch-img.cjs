const https = require('https');
const url = process.argv[2] || 'https://ibb.co/6RYXCvv2';
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) console.log(match[1]);
  });
});
