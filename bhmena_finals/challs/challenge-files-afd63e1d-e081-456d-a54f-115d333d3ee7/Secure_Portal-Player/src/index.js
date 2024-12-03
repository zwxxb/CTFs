const express = require('express');
const bodyParser = require('body-parser');
const crypto=require('crypto');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

const SECRET_KEY = crypto.randomBytes(32).toString("hex");



async function createAdminUser() {
    const adminEmail = 'admin@admin.com';
    const adminPassword = process.env.FLAG || 'adminpassword';
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
  
    if (!adminUser) {
  
  
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: adminPassword,
          profile: {
            create: {
              email: adminEmail, // You can use the same email or another field for profile
            },
          },
        },
      });
      
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
  
  createAdminUser();


// User registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password){
    return res.status(400).json({error: "Please fill all fields"})
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        profile: {
          create: {
            email: email,
          },
        },
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'User already exists' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(400).json({error: "Please fill all fields"})
  }
  const user = await prisma.user.findUnique({
    where: { email,password },
  });

  if (user.length == 0) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized1' });
  }
};

// Protected route
app.post('/profile', authMiddleware, async (req, res) => {
  const {userId} = req.body;

    const profile = await prisma.profile.findMany({
    where: userId
  });
  
  
  res.json(profile);
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});