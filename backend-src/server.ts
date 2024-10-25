import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

const uri = process.env.CONNECTION_STRING;
if (!uri) {
  throw new Error("CONNECTION_STRING is not defined in the environment variables.");
}

const client = new MongoClient(uri);

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
}).catch(console.error);

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
