const express = require('express');
const app = express();
const join = require('path').join;
const session = require("express-session");
const crypto = require('crypto');
const dayjs = require('dayjs');
const { exec } = require('child_process');

const publicPath = join(__dirname, 'html');
const TIME_FORMAT = {ko: 'hh:mm:ss', ch: 'hh:mm:s', jp: 'hh:m:s'};

const BotDelaySeconds = 7;
let lastBotTime = dayjs();
const ADMIN_ID = 'admin'; 
let ADMIN_PS = crypto.randomBytes(30).toString('hex');
const FLAG = 'DH{test}';

let accounts = {};
accounts[ADMIN_ID] = {'password': ADMIN_PS, country: 'ko', content: 'hello', viewtime: dayjs(), checked: true};

app.use(express.urlencoded({
	limit: '20kb',
	extended: false
}));

app.use( 
	session({
		secret: crypto.randomBytes(30).toString('hex'),
		resave: false,
		cookie: {
            httpOnly: false
		},
		saveUninitialized: true,
	})
);
	
app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "no-store");
	
	next();
});

const getRandomDateTime = () => {
	const year = crypto.randomInt(2000, 9000); 
	const month = crypto.randomInt(1, 13); 
	const day = crypto.randomInt(1, 29); 
	const hour = crypto.randomInt(0, 24);
	const minute = crypto.randomInt(0, 60); 
	const second = crypto.randomInt(0, 60); 
	
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
  
const isAdmin = (req, res, next) => {
	if (req.session.username !== ADMIN_ID) {
         res.send(`<script>alert('now allowed');history.back();</script>`);
    }
	
	next();
};

app.get('/', (req, res) => {
	res.send('expres');
});

app.get('/view', (req, res) => {
	const username = req.query.username + '';
	
	if (username in accounts && (username != ADMIN_ID || (req.session?.username === ADMIN_ID))) {
		const user = accounts[username];
		if (user.checked && dayjs().isAfter(user.viewtime)) {
			
			res.send(`
<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			#logoutButton {
				position: fixed;
				top: 10px; 
				right: 10px; 
				padding: 10px;
				background-color: #3498db; 
				color: #fff; 
				border: none;
				border-radius: 5px;
				cursor: pointer;
			}
		</style>
	</head>
	<body>
		<button id="logoutButton" onClick="location.href='/logout'">로그아웃</button>
		${user.content}
	</body>
</html>`);	
			
		} else {
			const until = user.viewtime.format(TIME_FORMAT[user.country]);
			res.send(`<script>alert('wait until ${until}');</script>`);	
		}
	} else {
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});

app.get('/write', (req, res) => {
	if (req.session && req.session.username) {
		res.sendFile(join(publicPath, 'write.html'));
	} else {
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});

app.post('/write', (req, res) => {
	if (req.session && req.session.username) {
		const username = req.session.username;
		const content = req.body.content + '';
		const minutes = parseInt(req.body.minutes);
		const seconds = parseInt(req.body.seconds);
		
		if (0 <= minutes && minutes < 60 && 0 <= seconds && seconds < 60 ) {
			accounts[username].content = content;
			if (accounts[username].checked) {
				accounts[username].viewtime = dayjs().add(seconds, 'second').add(minutes, 'minute');
			}
			// i want to get all the object properties and values in the object as json format
			console.log(`the account object: ${JSON.stringify(accounts[username])}`);

			res.send(`<script>location.href='/view?username='+'${username}';</script>`);
		} else {
			res.send(`<script>alert('fail');history.back();</script>`);
		}
	} else {
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});

app.get('/login', (req, res) => {
	res.sendFile(join(publicPath, 'login.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username + '';
    const password = req.body.password + '';
	
	if (accounts[username]?.password === password ) {
		req.session.username = username;
		res.send(`<script>location.href='/write';</script>`);
	} else {
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});

app.get('/register', (req, res) => {
	res.sendFile(join(publicPath, 'register.html'));
});

app.post('/register', (req, res) => {
    const username = req.body.username + '';
    const password = req.body.password + '';
    const country = req.body.country + ''
	
	if (username.length > 0 && password.length > 0 && country.length > 0 && username != ADMIN_ID) {
		const user = {password: password, country: country, content: 'hello', viewtime: dayjs(getRandomDateTime()), checked: false};
		accounts[username] = user;
		console.log(accounts);
		res.send(`<script>location.href='/login';</script>`);
	} else {
		res.send(`<script>alert('fail');history.back();</script>`);
	}
		
});

app.get('/clear', isAdmin, (req, res) => {
	if (req.session?.username === 'clear_account') {
		accounts = {};
		ADMIN_PS = crypto.randomBytes(30).toString('hex');
		accounts[ADMIN_ID] = {'password': ADMIN_PS, country: 'ko', content: 'hello', viewtime: dayjs(), checked: true};
		console.log(accounts);
		res.send(`<script>history.back();</script>`);
	} else {		
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});

app.get('/check', (req, res) => {
	if (req.session.username && accounts[req.session.username].viewtime.format('YYYY-MM-DD HH:mm:ss') === req.query?.day + '') {
		accounts[req.session.username].checked = true;
		res.send(`<script>history.back();</script>`);
	} else {		
		res.send(`<script>alert('fail');history.back();</script>`);
	}
});


app.get('/logout', async (req, res) => {
	if (req.session?.username) {
		await req.session.destroy(function (err) {
			if (err)
				res.send(`<script>alert('fail');history.back();</script>`);
			else
			  res.send(`<script>location.href='/login';</script>`);
		})
	} else {
		res.send(`<script>alert('not login');history.back();</script>`);
	}
});

app.get('/bot', (req, res) => {
	if (req.query?.path && dayjs().isAfter(lastBotTime.add(BotDelaySeconds, 'second'))) {
		lastBotTime = dayjs();
		const url = `http://localhost/${req.query?.path}`;
		exec(`node /app/bot.js "${btoa(url)}" "${btoa(ADMIN_ID)}" "${btoa(ADMIN_PS)}" "${btoa(FLAG)}"`, (error, stdout, stderr) => {
			if (error) {
				console.error(`bot error ${error.message}`);
			} else if (stderr) {
				console.error(`bot std error ${stderr.message}`);
			}
		});
		res.send(`reported`);
	} else {
		res.send(`/bot?path=`);
	}
});

app.listen(80, () => {
	console.log(`Express server listening on port 80`);
});
