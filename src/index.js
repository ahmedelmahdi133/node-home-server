import express from 'express';
// const mongoose = require('mongoose');

const app = express();

import redis from 'redis';


const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('end', () => {
  console.log('Redis connection closed');
});
client.connect();


const DB_USER = 'postgres';
const DB_PASSWORD = '1231';
const DB_HOST = 'postgres';
const DB_PORT = '5432';

import pg from 'pg';
const { Pool, Client } = pg
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
 
const pool = new Pool({
  connectionString,
})
 
await pool.query('SELECT NOW()')
await pool.end()
 
const postgres_client = new Client({
  connectionString,
})
 
await postgres_client.connect().then(() => console.log('Connected to PostgreSQL')).catch((error) => console.error('Error connecting to PostgreSQL:', error));
 
await postgres_client.query('SELECT NOW()')
 
await postgres_client.end()

// const db_host = "mongo";
// const db_port = "27017";
// const db_user = "aelmahdi13";
// const db_pass = "aHMEDO1063114260";
// const db_name = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}?authSource=admin`;

// mongoose.connect(db_name)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error));


app.get('/', (req, res) => {
  client.set('key', 'Hello Redis!');
  res.send('Hello World!');
});
app.get("/ahmed", (req, res) => {
  res.send("Hello Ahmed!");
});
app.get('/postgres-test', async (req, res) => {
  try {
    const result = await postgres_client.query('SELECT NOW()');
    res.send(`Current time from PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Error querying PostgreSQL:', error);
    res.status(500).send('Error querying PostgreSQL');
  } 
});
app.get('/postgres', async (req, res) => {
  try {
    const result = await postgres_client.query('SELECT NOW()');
    res.send(`Current time from PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Error querying PostgreSQL:', error);
    res.status(500).send('Error querying PostgreSQL');
  } 
});

app.get('/redis', async (req, res) => {
  try {
    const value = await client.get('key');
    res.send(`Value from Redis: ${value}`);
  } catch (error) {
    console.error('Error getting value from Redis:', error);
    res.status(500).send('Error getting value from Redis');
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

