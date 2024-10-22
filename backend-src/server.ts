import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.CONNECTION_STRING || '';
const jwtSecret = process.env.JWT_SECRET || '';
