import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'; 
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = 4343;  

const uri = process.env.CONNECTION_STRING;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
if (!uri) {
  throw new Error("CONNECTION_STRING is not defined in the environment variables.");
}


const client = new MongoClient(uri);

app.use(cors());  
app.use(express.json());

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db('chat');
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

connectToDatabase().then(db => {
  
  app.get('/api/users', async (_req, res) => {
    try {
      const users = await db.collection('user').find().toArray();
      res.json(users);
    } catch (error) {
      res.status(500).send("Error fetching users");
    }
  });

  
  app.get('/api/channels', async (_req, res) => {
    try {
      const channels = await db.collection('channel').find().toArray();
      res.json(channels);
    } catch (error) {
      res.status(500).send("Error fetching channels");
    }
  });

 
  app.get('/api/dms', async (_req, res) => {
    try {
      const dms = await db.collection('dm').find().toArray();
      res.json(dms);
    } catch (error) {
      res.status(500).send("Error fetching dms");
    }
  });

}).catch(console.error);

/* Login */
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    /* TestUser */
    if (username === 'Fredrik' && password === 'abc123') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.body.user = decoded;
    next();
  });
};


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
