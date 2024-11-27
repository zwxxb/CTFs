const express = require('express');
const app = express();

// Set security headers
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});

app.get('/', (req, res) => {
    const xss = req.query.xss ? req.query.xss.replace(/[^0-9A-Za-mo-z.\[\]=]/g, ' ') : '1';
    
    const jsFunction = `
        onload=onhashchange=func;
        function func(){
            try{
                ${xss};
                let u = location.hash.slice(1);
                if(u.match(/^https?:\\/\\/cure53.de\\/)) {
                    "/" + u.match(/\\/);
                    location = u;
                }
            } catch(e) {
                throw ${xss};
            }
        }
    `;
    
    res.send(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>The XSS Metaphor</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1, h6 {
                    color: #333;
                }
                p {
                    line-height: 1.6;
                }
                ol {
                    margin-left: 20px;
                }
            </style>
            <script type="text/javascript">
                ${jsFunction}
            </script>
        </head>
        <body>
            <h6>A challenge by Masato, FD and .mario</h6>
            <h1>The XSS Metaphor</h1>
            <p>
                Is it real?
                <br>
                Can it be?
                <br>
                What is the meaning of life?
                <br>
                Can you execute <code>alert(1)</code> in this origin?
                <br>
                Is the vulnerable parameter called <code>xss</code>? 
                <br>
                Does it matter?
            </p>
            <p>In scope are recent Chrome, Edge and Firefox browsers.
                <br>
                There is more than one expected solution. One easy, one hard. Experts will find both. User interaction is not required.
            </p>
            <h2>Winners</h2>
            <ol>
                <li>You?</li>
            </ol>
            <p>
                Mail <a href="mailto:mario@cure53.de">.mario</a> or <a href="mailto:filedescriptor@cure53.de">FD</a> or <a href="mailto:masato@cure53.de">Masato</a> if you did it :)
            </p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});