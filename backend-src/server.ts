import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = 4343;  

const uri = process.env.CONNECTION_STRING;
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
